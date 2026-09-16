import React, {
  useEffect,
  useState,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchTravelPackages,
  deleteTravelPackage,
  updateTravelPackage,
} from '../../store/slices/travelPackageSlice';

import { createBookingReservation } from '../../store/slices/bookingReservationSlice';

import { pushNotification } from '../../store/slices/authSlice';

import TravelPackageForm from './TravelPackageForm';
import TravelPackageDetail from './TravelPackageDetail';

import CapacityBar from '../common/CapacityBar';
import EmptyState from '../common/EmptyState';

import { can } from '../../utils/permissions';

const PACKAGE_IMAGES = {
  'Swiss Alps':
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85',

  'Amalfi':
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85',

  'Italy':
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85',

  'Kyoto':
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85',

  'Goa':
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85',

  'Bali':
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85',

  'Maldives':
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85',
};

const getPackageImage = (destination = '') => {
  const key = Object.keys(PACKAGE_IMAGES).find(
    (item) =>
      destination
        .toLowerCase()
        .includes(item.toLowerCase())
  );

  return (
    PACKAGE_IMAGES[key] ||
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85'
  );
};

const TravelPackageList = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
  } = useSelector(
    (state) => state.travelPackages
  );

  const role = useSelector(
    (state) =>
      state.auth.account?.role
  );

  const [search, setSearch] =
    useState('');

  const [showForm, setShowForm] =
    useState(false);

  const [editingPackage, setEditingPackage] =
    useState(null);

  const [selectedPackage, setSelectedPackage] =
    useState(null);

  const [applyingId, setApplyingId] =
    useState(null);

  useEffect(() => {
    dispatch(fetchTravelPackages());

  }, []);

  const filtered = (items || []).filter(
    (pkg) => {
      const q =
        search.toLowerCase().trim();

      return (
        !q ||
        pkg.packageName
          ?.toLowerCase()
          .includes(q) ||
        pkg.destination
          ?.toLowerCase()
          .includes(q)
      );
    }
  );

  const openEdit = (pkg) => {
    setSelectedPackage(null);
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const openCreate = () => {
    setEditingPackage(null);
    setShowForm(true);
  };

  const openDetails = (pkg) => {
    setSelectedPackage(pkg);
  };

  const toggleActive = (pkg) => {
    dispatch(
      updateTravelPackage({
        id: pkg.id,
        payload: {
          ...pkg,
          active: !pkg.active,
        },
      })
    );
  };

  const applyForPackage = async (pkg) => {
    setApplyingId(pkg.id);

    try {
      await dispatch(
        createBookingReservation({
          itineraryId: pkg.id,
          amount: pkg.price,
          bookingStatus: 'PENDING',
          paymentStatus: 'PENDING',
        })
      ).unwrap();

      dispatch(
        pushNotification({
          type: 'success',
          message: `Applied for "${pkg.packageName}" — pending confirmation.`,
        })
      );

      setSelectedPackage(null);
    } catch (err) {
      dispatch(
        pushNotification({
          type: 'error',
          message:
            'Could not submit your application. Try again.',
        })
      );
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="packages-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="packages-header">

        <div>

          <div className="packages-eyebrow">
            EXPLORE
          </div>

          <h1>
            Curated Travel Packages
          </h1>

          <p>
            Browse destinations and find a journey
            that fits your plans.
          </p>

        </div>

        {can(
          role,
          'CREATE_PACKAGE'
        ) && (
          <button
            type="button"
            className="packages-create-button"
            onClick={openCreate}
          >
            <span>+</span>
            Add Package
          </button>
        )}

      </div>


      {/* =================================================
          SEARCH / TOOLBAR
      ================================================= */}

      <div className="packages-toolbar">

        <div className="packages-search">

          <span className="packages-search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search by destination or region..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          {search && (
            <button
              type="button"
              className="packages-search-clear"
              onClick={() =>
                setSearch('')
              }
            >
              ×
            </button>
          )}

        </div>

        <div className="packages-count">
          {filtered.length}{' '}
          {filtered.length === 1
            ? 'package'
            : 'packages'}
        </div>

      </div>


      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="packages-loading">

          <div className="packages-loading-card" />
          <div className="packages-loading-card" />

        </div>
      )}


      {/* =================================================
          EMPTY
      ================================================= */}

      {!loading &&
        filtered.length === 0 && (
          <EmptyState
            message="No travel packages match your filters."
          />
        )}


      {/* =================================================
          PACKAGE GRID
      ================================================= */}

      {!loading &&
        filtered.length > 0 && (
          <div className="packages-grid">

            {filtered.map((pkg) => {

              const total =
                Number(
                  pkg.totalCapacity
                ) || 0;

              const reserved =
                Number(
                  pkg.reservedCapacity
                ) || 0;

              const percentage =
                total > 0
                  ? Math.round(
                      (reserved / total) *
                        100
                    )
                  : 0;

              return (
                <article
                  className="package-card"
                  key={pkg.id}
                >

                  {/* IMAGE */}

                  <button
                    type="button"
                    className="package-card-image"
                    onClick={() =>
                      openDetails(pkg)
                    }
                  >

                    <img
                      src={getPackageImage(
                        pkg.destination
                      )}
                      alt={
                        pkg.destination
                      }
                    />

                    <span
                      className={`package-status ${
                        pkg.active
                          ? 'active'
                          : 'inactive'
                      }`}
                    >
                      {pkg.active
                        ? 'ACTIVE'
                        : 'INACTIVE'}
                    </span>

                  </button>


                  {/* CONTENT */}

                  <div className="package-card-content">

                    <div className="package-card-location">
                      {pkg.destination}
                    </div>

                    <h2>
                      {pkg.packageName}
                    </h2>

                    <div className="package-card-price">
                      <span>
                        FROM
                      </span>

                      ${pkg.price}
                    </div>


                    {/* CAPACITY */}

                    {total > 0 && (
                      <div className="package-card-capacity">

                        <div className="package-card-capacity-top">

                          <span>
                            Availability
                          </span>

                          <strong>
                            {total -
                              reserved}{' '}
                            spots left
                          </strong>

                        </div>

                        <div className="package-card-capacity-bar">

                          <span
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                        <small>
                          {reserved}/
                          {total} reserved
                        </small>

                      </div>
                    )}


                    {/* ACTIONS */}

                    <div className="package-card-actions">

                      <button
                        type="button"
                        className="package-view-button"
                        onClick={() =>
                          openDetails(pkg)
                        }
                      >
                        View package
                        <span>→</span>
                      </button>


                      {can(
                        role,
                        'APPLY_PACKAGE'
                      ) &&
                        pkg.active && (
                          <button
                            type="button"
                            className="package-apply-button"
                            disabled={
                              applyingId ===
                              pkg.id
                            }
                            onClick={() =>
                              applyForPackage(
                                pkg
                              )
                            }
                          >
                            {applyingId ===
                            pkg.id
                              ? 'Applying…'
                              : 'Apply Now'}
                          </button>
                        )}

                    </div>


                    {/* MANAGER CONTROLS */}

                    {can(
                      role,
                      'EDIT_PACKAGE'
                    ) && (
                      <div className="package-manager-actions">

                        <button
                          type="button"
                          onClick={() =>
                            openEdit(pkg)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleActive(
                              pkg
                            )
                          }
                        >
                          {pkg.active
                            ? 'Deactivate'
                            : 'Activate'}
                        </button>

                        {can(
                          role,
                          'DELETE_PACKAGE'
                        ) && (
                          <button
                            type="button"
                            className="danger"
                            onClick={() =>
                              dispatch(
                                deleteTravelPackage(
                                  pkg.id
                                )
                              )
                            }
                          >
                            Delete
                          </button>
                        )}

                      </div>
                    )}

                  </div>

                </article>
              );
            })}

          </div>
        )}


      {/* =================================================
          PACKAGE DETAIL
      ================================================= */}

      {selectedPackage && (
        <TravelPackageDetail
          pkg={selectedPackage}
          role={role}
          applying={
            applyingId ===
            selectedPackage.id
          }
          onClose={() =>
            setSelectedPackage(null)
          }
          onApply={
            applyForPackage
          }
          onEdit={openEdit}
        />
      )}


      {/* =================================================
          FORM
      ================================================= */}

      {showForm && (
        <div className="package-form-overlay">

          <div className="package-form-modal">

            <TravelPackageForm
              initialData={
                editingPackage
              }
              onClose={() => {
                setShowForm(false);
                setEditingPackage(null);
              }}
            />

          </div>

        </div>
      )}

    </div>
  );
};

export default TravelPackageList;