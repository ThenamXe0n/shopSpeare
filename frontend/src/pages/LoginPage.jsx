import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUserApi } from "../service/apiCollections";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { loginUserAsync } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLoginUser = async (data) => {
    console.log("Login Data:", data);
    try {
      let response = await dispatch(loginUserAsync(data)).unwrap();
      toast.success(response.message);
      // toast.success(response.message);
      // localStorage.setItem(
      //   "userdetails",
      //   JSON.stringify(response?.data) || null,
      // );
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to continue</p>

        <form onSubmit={handleSubmit(handleLoginUser)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-black">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-black">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
