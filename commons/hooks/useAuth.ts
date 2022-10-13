import { computed } from "vue"
import Cookiesjs from "js-cookie";
import { UserType } from "../types/users.model"
import { useRouter, useRoute, useStore } from "./useNuxt"

export const useAuth = () => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const user = computed<UserType>(() => {
    // @ts-ignore
    return store.state.user
  })

  const canRemove = computed<boolean>(() => {
    const remove = ['admin']
    return remove.includes(user.value.role)
  })
  const canEdit = computed<boolean>(() => {
    const edit = ['admin', 'guest']
    return edit.includes(user.value.role)
  })

  const canAdd = computed<boolean>(() => {
    const add = ['admin', 'guest']
    return add.includes(user.value.role)
  })
  const logout = () => {
    store.commit("setLoggedIn", false);
    store.commit("setUser", {
      email: "",
      password: "",
    });
    // @ts-ignore
    Cookiesjs.remove("isAuth");
    Cookiesjs.remove("Auth");
    Cookiesjs.remove("token");
    window.location.replace("/login");
    // router.push('/login')

  }

  return {
    canAdd,
    canEdit,
    canRemove,
    user,
    logout
  }
}
