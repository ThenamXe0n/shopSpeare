import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaPhoneAlt, FaHome, FaCity, FaMapPin, FaFlag, FaCamera } from 'react-icons/fa';
import { registerUserApi } from '../service/apiCollections';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const profilePreview = watch('profilePic');

  const onSubmit = async(data) => {
    const formData = new FormData();

    formData.append('userImage', data.profilePic[0]);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('name', data.name);
    formData.append('contact', data.contact);
    formData.append('address[house]', data.house);
    formData.append('address[city]', data.city);
    formData.append('address[pincode]', data.pincode);
    formData.append('address[state]', data.state);
    formData.append('address[contact]', data.addressContact);

    console.log('Multipart FormData Ready');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try{
        let response = await registerUserApi(formData)
        alert(response.message || "User registered successfully");
        window.location.replace(response.redirectUrl || "/login");
    }catch(error){
        console.log(error.message)
        alert("Error uploading data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="hidden lg:flex flex-col justify-center bg-gray-900 text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-300 leading-7">
            Create your account with profile image, contact details, and address information.
            Clean multipart form handling with React Hook Form.
          </p>
        </div>

        <div className="p-8 md:p-10 max-h-screen overflow-y-auto">
          <div className="mb-8 flex justify-center">
            <div className="w-28 h-16 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 font-medium">
              Logo Here
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Profile Picture</label>
              <label className="border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                <FaCamera className="text-2xl text-gray-500 mb-2" />
                <span className="text-sm text-gray-500">Upload Profile Image</span>
                <input type="file" accept="image/*" {...register('profilePic', { required: true })} className="hidden" />
              </label>
              {errors.profilePic && <p className="text-red-500 text-xs mt-1">Profile image is required</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField icon={<FaUser />} placeholder="Full Name" register={register('name', { required: true })} error={errors.name} />
              <InputField icon={<FaEnvelope />} placeholder="Email Address" type="email" register={register('email', { required: true })} error={errors.email} />
              <InputField icon={<FaLock />} placeholder="Password" type="password" register={register('password', { required: true })} error={errors.password} />
              <InputField icon={<FaPhoneAlt />} placeholder="Contact Number" register={register('contact', { required: true })} error={errors.contact} />
            </div>

            <h3 className="text-lg font-semibold pt-4 border-t">Address Details</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField icon={<FaHome />} placeholder="House / Street" register={register('house')} />
              <InputField icon={<FaCity />} placeholder="City" register={register('city')} />
              <InputField icon={<FaMapPin />} placeholder="Pincode" register={register('pincode')} />
              <InputField icon={<FaFlag />} placeholder="State" register={register('state')} />
              <div className="md:col-span-2">
                <InputField icon={<FaPhoneAlt />} placeholder="Alternate Address Contact" register={register('addressContact')} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-2xl font-medium hover:bg-black transition"
            >
              Register User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ icon, placeholder, type = 'text', register, error }) {
  return (
    <div>
      <div className="flex items-center border rounded-2xl px-4 py-3 bg-gray-50 focus-within:border-gray-900">
        <span className="text-gray-400 mr-3">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">This field is required</p>}
    </div>
  );
}
