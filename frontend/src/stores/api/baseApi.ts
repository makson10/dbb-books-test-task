import { emptyApi as api } from "./emptyApi";
export const addTagTypes = [
  "books",
  "authors",
  "genres",
  "publishers",
  "borrow",
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
        query: (queryArg) => ({
          url: `/books`,
          method: "POST",
          body: queryArg.createBook,
        }),
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
      getAllAuthors: build.query<GetAllAuthorsApiResponse, GetAllAuthorsApiArg>(
        {
          query: () => ({ url: `/authors` }),
          providesTags: ["authors"],
        },
      ),
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
      getAllBorrowRecords: build.query<
        GetAllBorrowRecordsApiResponse,
        GetAllBorrowRecordsApiArg
      >({
        query: () => ({ url: `/borrow` }),
        providesTags: ["borrow"],
      }),
      borrowBook: build.mutation<BorrowBookApiResponse, BorrowBookApiArg>({
        query: (queryArg) => ({
          url: `/borrow`,
          method: "POST",
          body: queryArg.createBorrowBook,
        }),
        invalidatesTags: ["borrow"],
      }),
      checkUserBorrowBook: build.mutation<
        CheckUserBorrowBookApiResponse,
        CheckUserBorrowBookApiArg
      >({
        query: (queryArg) => ({
          url: `/borrow/return`,
          method: "POST",
          body: queryArg.createBorrowBook,
        }),
        invalidatesTags: ["borrow"],
      }),
      getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
        query: () => ({ url: `/users` }),
        providesTags: ["users"],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          method: "POST",
          body: queryArg.createUser,
        }),
        invalidatesTags: ["users"],
      }),
      login: build.mutation<LoginApiResponse, LoginApiArg>({
        query: (queryArg) => ({
          url: `/users/login`,
          method: "POST",
          body: queryArg.login,
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
  /** status 200 Returns paginated list of books */ BookWithRelations[];
export type GetAllBooksApiArg = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
};
export type CreateBookApiResponse =
  /** status 201 Book created successfully */ Book;
export type CreateBookApiArg = {
  createBook: CreateBook;
};
export type GetBookCountApiResponse =
  /** status 200 Returns total count of books */ CountBook;
export type GetBookCountApiArg = void;
export type GetBookDetailsApiResponse =
  /** status 200 Returns borrowing history for the book */ BookWithRelations;
export type GetBookDetailsApiArg = {
  /** Book ID */
  id: string;
};
export type GetBookHistoryApiResponse =
  /** status 200 Returns borrowing history for the book */ BookBorrowHistory[];
export type GetBookHistoryApiArg = {
  /** Book ID */
  id: string;
};
export type GetAllAuthorsApiResponse =
  /** status 200 Returns all authors */ Author[];
export type GetAllAuthorsApiArg = void;
export type CreateAuthorApiResponse =
  /** status 201 Author created successfully */ Author;
export type CreateAuthorApiArg = {
  createAuthor: CreateAuthor;
};
export type GetAllAuthorBooksApiResponse =
  /** status 200 Returns books for the specified author */ Book[];
export type GetAllAuthorBooksApiArg = {
  /** Author ID */
  id: number;
};
export type GetGenresApiResponse =
  /** status 200 Returns all available genres */ Genre[];
export type GetGenresApiArg = void;
export type CreateGenreApiResponse =
  /** status 201 Genre created successfully */ Genre;
export type CreateGenreApiArg = {
  createGenre: CreateGenre;
};
export type GetAllPublishersApiResponse =
  /** status 200 Returns all available publishers */ Publisher[];
export type GetAllPublishersApiArg = void;
export type CreatePublisherApiResponse =
  /** status 201 Publisher created successfully */ Publisher;
export type CreatePublisherApiArg = {
  createPublisher: CreatePublisher;
};
export type GetAllBorrowRecordsApiResponse =
  /** status 200 List of all borrow records */ BorrowRecord[];
export type GetAllBorrowRecordsApiArg = void;
export type BorrowBookApiResponse =
  /** status 201 Book borrowed successfully */ BorrowRecord;
export type BorrowBookApiArg = {
  createBorrowBook: CreateBorrowBook;
};
export type CheckUserBorrowBookApiResponse =
  /** status 200 Returns borrowing status for the book and user */ BorrowStatus;
export type CheckUserBorrowBookApiArg = {
  createBorrowBook: CreateBorrowBook;
};
export type GetAllUsersApiResponse =
  /** status 200 List of all users */ ResponseUser[];
export type GetAllUsersApiArg = void;
export type CreateUserApiResponse =
  /** status 201 User created successfully */ AuthResponse;
export type CreateUserApiArg = {
  createUser: CreateUser;
};
export type LoginApiResponse =
  /** status 200 User logged in successfully */ AuthResponse;
export type LoginApiArg = {
  login: Login;
};
export type VerifyTokenApiResponse =
  /** status 200 Token is valid */ TokenPayload;
export type VerifyTokenApiArg = void;
export type Publisher = {
  id: number;
  /** Publisher name */
  name: string;
  /** Year publisher was established */
  establishedYear: number;
};
export type Book = {
  id: number;
  title: string;
  isbn: string;
  publishDate: string;
  copiesTotal: number;
  copiesAvailable: number;
  publisherId: number;
};
export type Author = {
  id: number;
  fullName: string;
  birthDate: string;
  books: Book[];
};
export type Genre = {
  id: number;
  /** Genre name */
  name: string;
};
export type BookWithRelations = {
  id: number;
  title: string;
  isbn: string;
  publishDate: string;
  copiesTotal: number;
  copiesAvailable: number;
  publisherId: number;
  publisher: Publisher;
  authors: Author[];
  genres: Genre[];
};
export type CreateBook = {
  title: string;
  isbn: string;
  publishDate: string;
  copiesTotal: number;
  authorName: string;
  publisherName: string;
  genre: string;
};
export type CountBook = {
  count: number;
};
export type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  password: string;
};
export type BookBorrowHistory = {
  id: number;
  borrowedAt: string;
  returnedAt: object | null;
  borrower: User;
  bookId: number;
  borrowerId: number;
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
export type BorrowRecord = {
  id: number;
  borrowedAt: string;
  returnedAt: object | null;
  book: Book;
  borrower: User;
};
export type CreateBorrowBook = {
  bookTitle: string;
  userName: string;
};
export type BorrowStatus = {
  hasActiveBorrow: boolean;
};
export type ResponseUser = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
};
export type AuthResponse = {
  user: User;
  token: string;
};
export type CreateUser = {
  name: string;
  email: string;
  password: string;
};
export type Login = {
  email: string;
  password: string;
};
export type TokenPayload = {
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
  useGetAllAuthorsQuery,
  useCreateAuthorMutation,
  useGetAllAuthorBooksQuery,
  useGetGenresQuery,
  useCreateGenreMutation,
  useGetAllPublishersQuery,
  useCreatePublisherMutation,
  useGetAllBorrowRecordsQuery,
  useBorrowBookMutation,
  useCheckUserBorrowBookMutation,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useLoginMutation,
  useVerifyTokenMutation,
} = injectedRtkApi;
