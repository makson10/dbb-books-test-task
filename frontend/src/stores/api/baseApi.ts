import { emptyApi as api } from "./emptyApi";
export const addTagTypes = [
  "books",
  "authors",
  "genres",
  "publishers",
  "borrow",
  "return",
  "users",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllBooks: build.query<GetAllBooksApiResponse, GetAllBooksApiArg>({
        query: (queryArg) => ({
          url: `/books`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            sortBy: queryArg.sortBy,
            order: queryArg.order,
          },
        }),
        providesTags: ["books"],
      }),
      createBook: build.mutation<CreateBookApiResponse, CreateBookApiArg>({
        query: () => ({ url: `/books`, method: "POST" }),
        invalidatesTags: ["books"],
      }),
      getBookCount: build.query<GetBookCountApiResponse, GetBookCountApiArg>({
        query: () => ({ url: `/books/count` }),
        providesTags: ["books"],
      }),
      getBookDetails: build.query<
        GetBookDetailsApiResponse,
        GetBookDetailsApiArg
      >({
        query: (queryArg) => ({ url: `/books/${queryArg.id}` }),
        providesTags: ["books"],
      }),
      getBookHistory: build.query<
        GetBookHistoryApiResponse,
        GetBookHistoryApiArg
      >({
        query: (queryArg) => ({ url: `/books/${queryArg.id}/history` }),
        providesTags: ["books"],
      }),
      authorsControllerGetAllAuthors: build.query<
        AuthorsControllerGetAllAuthorsApiResponse,
        AuthorsControllerGetAllAuthorsApiArg
      >({
        query: () => ({ url: `/authors` }),
        providesTags: ["authors"],
      }),
      createAuthor: build.mutation<CreateAuthorApiResponse, CreateAuthorApiArg>(
        {
          query: (queryArg) => ({
            url: `/authors`,
            method: "POST",
            body: queryArg.createAuthor,
          }),
          invalidatesTags: ["authors"],
        },
      ),
      getAllAuthorBooks: build.query<
        GetAllAuthorBooksApiResponse,
        GetAllAuthorBooksApiArg
      >({
        query: (queryArg) => ({ url: `/authors/${queryArg.id}/books` }),
        providesTags: ["authors"],
      }),
      getGenres: build.query<GetGenresApiResponse, GetGenresApiArg>({
        query: () => ({ url: `/genres` }),
        providesTags: ["genres"],
      }),
      createGenre: build.mutation<CreateGenreApiResponse, CreateGenreApiArg>({
        query: (queryArg) => ({
          url: `/genres`,
          method: "POST",
          body: queryArg.createGenre,
        }),
        invalidatesTags: ["genres"],
      }),
      getAllPublishers: build.query<
        GetAllPublishersApiResponse,
        GetAllPublishersApiArg
      >({
        query: () => ({ url: `/publishers` }),
        providesTags: ["publishers"],
      }),
      createPublisher: build.mutation<
        CreatePublisherApiResponse,
        CreatePublisherApiArg
      >({
        query: (queryArg) => ({
          url: `/publishers`,
          method: "POST",
          body: queryArg.createPublisher,
        }),
        invalidatesTags: ["publishers"],
      }),
      borrowControllerGetBorrowRecords: build.query<
        BorrowControllerGetBorrowRecordsApiResponse,
        BorrowControllerGetBorrowRecordsApiArg
      >({
        query: () => ({ url: `/borrow` }),
        providesTags: ["borrow"],
      }),
      borrowBook: build.mutation<BorrowBookApiResponse, BorrowBookApiArg>({
        query: (queryArg) => ({
          url: `/borrow`,
          method: "POST",
          body: queryArg.borrowBookDto,
        }),
        invalidatesTags: ["borrow"],
      }),
      checkIsUserBorrowBookAndDontReturn: build.mutation<
        CheckIsUserBorrowBookAndDontReturnApiResponse,
        CheckIsUserBorrowBookAndDontReturnApiArg
      >({
        query: (queryArg) => ({
          url: `/return`,
          method: "POST",
          body: queryArg.borrowBookDto,
        }),
        invalidatesTags: ["return"],
      }),
      usersControllerGetUsers: build.query<
        UsersControllerGetUsersApiResponse,
        UsersControllerGetUsersApiArg
      >({
        query: () => ({ url: `/users` }),
        providesTags: ["users"],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          method: "POST",
          body: queryArg.createUserDto,
        }),
        invalidatesTags: ["users"],
      }),
      login: build.mutation<LoginApiResponse, LoginApiArg>({
        query: (queryArg) => ({
          url: `/users/login`,
          method: "POST",
          body: queryArg.loginDto,
        }),
        invalidatesTags: ["users"],
      }),
      verifyToken: build.mutation<VerifyTokenApiResponse, VerifyTokenApiArg>({
        query: () => ({ url: `/users/verify`, method: "POST" }),
        invalidatesTags: ["users"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as baseApi };
export type GetAllBooksApiResponse =
  /** status 200 Returns paginated list of books */ BookWithRelationsDto[];
export type GetAllBooksApiArg = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
};
export type CreateBookApiResponse = unknown;
export type CreateBookApiArg = void;
export type GetBookCountApiResponse =
  /** status 200 Returns total count of books */ {
    count?: number;
  };
export type GetBookCountApiArg = void;
export type GetBookDetailsApiResponse =
  /** status 200 Returns borrowing history for the book */ BookWithRelationsDto;
export type GetBookDetailsApiArg = {
  /** Book ID */
  id: string;
};
export type GetBookHistoryApiResponse = unknown;
export type GetBookHistoryApiArg = {
  /** Book ID */
  id: string;
};
export type AuthorsControllerGetAllAuthorsApiResponse = unknown;
export type AuthorsControllerGetAllAuthorsApiArg = void;
export type CreateAuthorApiResponse = unknown;
export type CreateAuthorApiArg = {
  createAuthor: CreateAuthor;
};
export type GetAllAuthorBooksApiResponse = unknown;
export type GetAllAuthorBooksApiArg = {
  /** Author ID */
  id: number;
};
export type GetGenresApiResponse = unknown;
export type GetGenresApiArg = void;
export type CreateGenreApiResponse = unknown;
export type CreateGenreApiArg = {
  createGenre: CreateGenre;
};
export type GetAllPublishersApiResponse = unknown;
export type GetAllPublishersApiArg = void;
export type CreatePublisherApiResponse = unknown;
export type CreatePublisherApiArg = {
  createPublisher: CreatePublisher;
};
export type BorrowControllerGetBorrowRecordsApiResponse = unknown;
export type BorrowControllerGetBorrowRecordsApiArg = void;
export type BorrowBookApiResponse = unknown;
export type BorrowBookApiArg = {
  borrowBookDto: BorrowBookDto;
};
export type CheckIsUserBorrowBookAndDontReturnApiResponse = unknown;
export type CheckIsUserBorrowBookAndDontReturnApiArg = {
  borrowBookDto: BorrowBookDto;
};
export type UsersControllerGetUsersApiResponse = unknown;
export type UsersControllerGetUsersApiArg = void;
export type CreateUserApiResponse =
  /** status 201 User created successfully */ AuthResponseDto;
export type CreateUserApiArg = {
  createUserDto: CreateUserDto;
};
export type LoginApiResponse =
  /** status 200 User logged in successfully */ AuthResponseDto;
export type LoginApiArg = {
  loginDto: LoginDto;
};
export type VerifyTokenApiResponse =
  /** status 200 Token is valid */ TokenPayloadDto;
export type VerifyTokenApiArg = void;
export type PublisherDto = {
  id: number;
  /** Publisher name */
  name: string;
  /** Year publisher was established */
  establishedYear: number;
};
export type AuthorDto = {
  id: number;
  fullName: string;
  birthDate: string;
};
export type Genre = {
  id: number;
  /** Genre name */
  name: string;
};
export type BookWithRelationsDto = {
  id: number;
  title: string;
  isbn: string;
  publishDate: string;
  copiesTotal: number;
  copiesAvailable: number;
  publisherId: number;
  publisher: PublisherDto;
  authors: AuthorDto[];
  genres: Genre[];
};
export type CreateAuthor = {
  fullName: string;
  birthDate: string;
};
export type CreateGenre = {
  /** Genre name */
  name: string;
};
export type CreatePublisher = {
  /** Publisher name */
  name: string;
  /** Year publisher was established */
  establishedYear: number;
};
export type BorrowBookDto = {
  bookTitle: string;
  userName: string;
};
export type UserDto = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  password: string;
};
export type AuthResponseDto = {
  user: UserDto;
  token: string;
};
export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};
export type LoginDto = {
  email: string;
  password: string;
};
export type TokenPayloadDto = {
  id: number;
  name: string;
  role: "ADMIN" | "USER";
};
export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useGetBookCountQuery,
  useGetBookDetailsQuery,
  useGetBookHistoryQuery,
  useAuthorsControllerGetAllAuthorsQuery,
  useCreateAuthorMutation,
  useGetAllAuthorBooksQuery,
  useGetGenresQuery,
  useCreateGenreMutation,
  useGetAllPublishersQuery,
  useCreatePublisherMutation,
  useBorrowControllerGetBorrowRecordsQuery,
  useBorrowBookMutation,
  useCheckIsUserBorrowBookAndDontReturnMutation,
  useUsersControllerGetUsersQuery,
  useCreateUserMutation,
  useLoginMutation,
  useVerifyTokenMutation,
} = injectedRtkApi;
