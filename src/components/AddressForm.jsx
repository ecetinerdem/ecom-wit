// src/components/Shipment/AddressForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../store/actions/addressActions';
import { X } from 'lucide-react';

const AddressForm = ({ onClose, isEdit, initialData, type }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateAddress({ ...data, id: initialData.id }));
    } else {
      dispatch(addAddress(data));
    }
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      <h3 className="text-xl font-bold mb-4">
        {isEdit ? 'Edit Address' : `Add New ${type === 'shipping' ? 'Shipping' : 'Billing'} Address`}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('title', { required: 'Address title is required' })}
            placeholder="Address Title"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register('surname', { required: 'Surname is required' })}
              placeholder="Surname"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
          </div>
        </div>

        <div>
          <input
            {...register('phone', { required: 'Phone is required' })}
            placeholder="Phone Number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <input
            {...register('city', { required: 'City is required' })}
            placeholder="City"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>

        <div>
          <input
            {...register('district', { required: 'District is required' })}
            placeholder="District"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
        </div>

        <div>
          <input
            {...register('neighborhood', { required: 'Neighborhood is required' })}
            placeholder="Neighborhood"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.neighborhood && <p className="text-red-500 text-sm">{errors.neighborhood.message}</p>}
        </div>

        <div>
          <textarea
            {...register('address', { required: 'Address details are required' })}
            placeholder="Detailed Address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#23A6F0] text-white rounded hover:bg-blue-600"        >
          {isEdit ? 'Update Address' : 'Save Address'}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
