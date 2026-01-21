import { create } from "zustand";
import { api2 } from "../api/axios";

const useMessage = create((set, get) => ({
  isContactsLoading: false,
  isMessagesLoading: false,
  isGetAllUserMessage: false,
  selectedUser: null,
  isSending: false,

  getAllcontact: async () => {
    if (get().isContactsLoading) return;

    set({ isContactsLoading: true });

    try {
      const res = await api2.get("/message/contact");
      if (res.status === 200) {
        set({ allcontact: res.data.nameUser });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isContactsLoading: false });
    }
  },

  getConversations: async () => {
    if (get().isGetAllUserMessage) return;

    set({ isGetAllUserMessage: true });
    try {
      const res = await api2.get('/message');
      if (res.status === 200) {
        set({ allusermessage: res.data.allmessageUser });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGetAllUserMessage: false });
    }
  },

  // Refactored to accept just ID or object. If object is passed, we can set selectedUser immediately.
  // But usually we just pass ID. We need to find the user from contacts to set selectedUser.
  getMessage: async (id) => {
    if (!id) return;

    // Attempt to find user in contacts to set name/avatar in header
    const contacts = get().allcontact;
    const user = contacts.find(c => c.id === id || c._id === id);
    if (user) set({ selectedUser: user });

    set({ isMessagesLoading: true });

    try {
      const res = await api2.get(`/message/contact/${id}`);
      if (res.status === 200) {
        set({ allmessage: res.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { text, image, recivedId } = data;
    if (!recivedId || (!text && !image)) return;

    set({ isSending: true });
    try {
      const res = await api2.post(`/message/send/${recivedId}`, {
        text,
        imageMessage: image
      });

      if (res.status === 200) {
        // Optimistically update or fetch again. For now, let's append.
        // The backend returns { message: "...", newMessage: {...} }
        const newMessage = res.data.newMessage;
        set({ allmessage: [...get().allmessage, newMessage] });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSending: false });
    }
  },
}));

export default useMessage;
