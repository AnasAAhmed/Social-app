interface Session {
  user: {
    id: string
    email: string
    image: string
    name: string
  }
}

interface AuthResult {
  type: string
  message: string
}
interface Result {
  type: string
  resultCode: string
};
interface NextAuthUser {
  id?: string
  name?: string | null
  password?: string | null
  email?: string | null
  image?: string | null
}
type feedPostsType = PostsType & {
  user: User & {
    userInfo: UserInfo
  },
} & { likes: { userId: string }[] } & {
  _count: { comments: number }
}
