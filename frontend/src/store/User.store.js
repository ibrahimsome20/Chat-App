import { create } from 'zustand'
import api from '../api/axios'
import { toast } from 'react-hot-toast'
import { Check } from 'lucide-react'
import { isAxiosError } from 'axios'




const userStore = create((set,get) => ({

  isSignIn: false,
  isLogin: false,
  isAuth: false,
  user: null,
  loading: false,
  isLogout: false,
  isUpdateProfilePic:false,

  signIn: async (data) => {
    set({ isSignIn: true, loading: true })

    try {
      const res = await api.post('/signup', data)

      if (res.status == '201') {

        toast.success(res.data.message, { id: 'success-message' })
        set({ user: res.data.user })

      } else {
        setTimeout(() => {
          toast.error(res.data.message, { id: 'user exist' })
        }, 1000)

      }
    } catch (error) {
      setTimeout(() => {

        toast.error(error.response?.data?.message || error.message, { id: "erorr message" })
      }, 1000)
    } finally {
      setTimeout(() => {
        set({ isSignIn: false, loading: false })

      }, 1000)
    }
  }
  ,
  login: async (data) => {
    set({ isLogin: true, loading: true })
    try {
      const res = await api.post('/login', data)
      toast.success(res.data.message)
      setTimeout(() => {
        set({ user: res.data.user, isAuth: true })
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed", { id: "login failed" })
    } finally {
      set({ loading: false, isLogin: false })
    }
  }
  ,
  isAuthenticated: async () => {
    set({ loading: true })
    try {
      const res = await api.get('/auth')
      // console.log(res.data.user)
      set({ isAuth: true, user: res.data.user })

    } catch (error) {
      set({ isAuth: false })
      console.log(error.response?.data?.message)
    }
    finally {
      set({ loading: false })
    }
  }
  ,
  logout: async () => {
    set({ loading: true, isLogout: true })
    try {
      const res = await api.post('/logout')
      if (res.status === 200) {
        toast.success(res.data.message)
        setTimeout(() => {
          set({ isAuth: false })
        }, 1000)
      }
    } catch (error) {
      console.log(error.response?.data?.message)
    }
    finally {
      set({ user: null, isLogout: false })
    }
  }
  ,
  updateProfilePic: async (file) => {
  set({ isUpdateProfilePic: true });

  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.patch(
      "/updateProfile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    toast.success("Profile picture updated");

    // تحديث user مباشرة
    set({
      user: {
        ...get().user,
        avatar: res.data.avatar,
      },
    });

    return res.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Upload failed"
    );
  } finally {
    set({ isUpdateProfilePic: false });
  }
  },








}))
export default userStore