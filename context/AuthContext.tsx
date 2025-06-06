import { useStorageState } from "@/hooks/useStorageState";
import { createContext, useContext, type PropsWithChildren } from "react";

// 定义用户类型
interface User {
  id: string;
  userName: string;
  email: string;
  phone: string;
  avatar?: string;
  balance?: number;
}

// 定义 Session 类型
interface Session {
  token: string;
  user: User;
}

// 创建 AuthContext
const AuthContext = createContext<{
  signIn: (session: Session) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// useSession 钩子
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

// SessionProvider 组件
export function SessionProvider({ children }: PropsWithChildren) {
  // 明确指定 useStorageState 的泛型类型为 Session | null
  const [[isLoading, session], setSession] = useStorageState<Session | null>(
    "session"
  );

  return (
    <AuthContext.Provider
      value={{
        signIn: (newSession: Session) => {
          console.log("signIn 调用:", newSession); // 调试
          setSession(newSession);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
