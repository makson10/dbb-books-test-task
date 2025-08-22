--
-- PostgreSQL database dump
--

\restrict 2YradMln9b0fDC7jiiCKVbwedNXmMTf1EestNtVNnlm6lYCydU5Xclnce9QBfQg

-- Dumped from database version 17.6 (Debian 17.6-1.pgdg13+1)
-- Dumped by pg_dump version 17.6 (Debian 17.6-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role_enum AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public.user_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.author (
    id integer NOT NULL,
    "fullName" character varying NOT NULL,
    "birthDate" date NOT NULL
);


ALTER TABLE public.author OWNER TO postgres;

--
-- Name: author_books_book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.author_books_book (
    "authorId" integer NOT NULL,
    "bookId" integer NOT NULL
);


ALTER TABLE public.author_books_book OWNER TO postgres;

--
-- Name: author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.author_id_seq OWNER TO postgres;

--
-- Name: author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.author_id_seq OWNED BY public.author.id;


--
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    id integer NOT NULL,
    title character varying NOT NULL,
    isbn character varying NOT NULL,
    "publishDate" date NOT NULL,
    "copiesTotal" integer NOT NULL,
    "copiesAvailable" integer NOT NULL,
    "publisherId" integer NOT NULL
);


ALTER TABLE public.book OWNER TO postgres;

--
-- Name: book_authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_authors (
    "bookId" integer NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE public.book_authors OWNER TO postgres;

--
-- Name: book_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_genres (
    "bookId" integer NOT NULL,
    "genreId" integer NOT NULL
);


ALTER TABLE public.book_genres OWNER TO postgres;

--
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_id_seq OWNER TO postgres;

--
-- Name: book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;


--
-- Name: borrow_record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.borrow_record (
    id integer NOT NULL,
    "bookId" integer NOT NULL,
    "borrowerId" integer NOT NULL,
    "borrowedAt" timestamp with time zone DEFAULT '2025-08-20 22:31:07.698+00'::timestamp with time zone NOT NULL,
    "returnedAt" timestamp with time zone
);


ALTER TABLE public.borrow_record OWNER TO postgres;

--
-- Name: borrow_record_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.borrow_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.borrow_record_id_seq OWNER TO postgres;

--
-- Name: borrow_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.borrow_record_id_seq OWNED BY public.borrow_record.id;


--
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genre_id_seq OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- Name: publisher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publisher (
    id integer NOT NULL,
    name character varying NOT NULL,
    "establishedYear" integer NOT NULL
);


ALTER TABLE public.publisher OWNER TO postgres;

--
-- Name: publisher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publisher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.publisher_id_seq OWNER TO postgres;

--
-- Name: publisher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publisher_id_seq OWNED BY public.publisher.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    role public.user_role_enum DEFAULT 'USER'::public.user_role_enum NOT NULL,
    password character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: author id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author ALTER COLUMN id SET DEFAULT nextval('public.author_id_seq'::regclass);


--
-- Name: book id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);


--
-- Name: borrow_record id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow_record ALTER COLUMN id SET DEFAULT nextval('public.borrow_record_id_seq'::regclass);


--
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- Name: publisher id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publisher ALTER COLUMN id SET DEFAULT nextval('public.publisher_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.author (id, "fullName", "birthDate") FROM stdin;
1	Nora Lowe	1977-01-12
2	Christina Gottlieb	1978-12-08
3	Merle Padberg	1977-10-26
4	Cory Metz	1977-12-30
5	Miss Opal Bayer	2018-05-29
6	Zachary Corwin	1983-06-25
7	Miss Betty Jaskolski	1965-05-24
8	Felicia Murazik	1946-07-09
9	Lauren Johnson	1977-07-27
10	Stewart Flatley	1968-10-31
11	Edith Nicolas Jr.	1956-09-15
\.


--
-- Data for Name: author_books_book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.author_books_book ("authorId", "bookId") FROM stdin;
\.


--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book (id, title, isbn, "publishDate", "copiesTotal", "copiesAvailable", "publisherId") FROM stdin;
1	Josefine Mutzenbacher	978-1-9846-3533-4	1996-02-12	406	406	9
2	Brideshead Revisited	978-1-5397-2035-5	2002-02-02	963	963	4
3	Money	978-0-304-14670-3	2014-06-18	577	577	6
4	Bleak House	978-1-83424-638-3	2023-10-09	673	673	7
5	Hitting the line	978-0-581-52170-5	2000-06-05	340	340	3
6	Brave New World	978-1-260-48155-6	1996-11-08	573	573	1
7	Uncle Tom's Cabin	978-1-55809-751-3	1987-05-14	524	524	5
8	The Count of Monte Cristo	978-0-301-72370-9	2005-08-08	862	862	1
9	The Tin Drum	978-0-551-42170-7	2019-05-09	600	600	4
10	His Dark Materials	978-1-103-95437-7	1995-02-22	974	974	4
11	Long Walk to Freedom	978-1-322-40006-8	2001-10-09	468	468	5
12	Portnoy's Complaint	978-0-447-30853-2	2025-01-28	77	77	8
13	Charlie and the Chocolate Factory	978-1-390-01102-9	2024-07-14	310	310	4
14	War and Peace	978-1-4558-2276-8	1995-05-21	297	297	7
15	David Copperfield	978-0-13-268453-8	2017-11-12	139	139	7
16	If on a Winter's Night a Traveler	978-0-11-615647-1	2001-01-15	984	984	5
17	The Corrections	978-1-0901-7473-4	2015-01-17	744	744	8
18	Dr. Zhivago	978-0-375-92747-8	2013-02-05	848	848	8
19	The Odyssey	978-1-75950-598-5	2019-01-23	807	807	7
20	And Then There Were None	978-0-03-873419-1	2023-07-11	882	882	9
21	The Catcher in the Rye	978-0-8233-9333-6	2025-01-02	247	247	3
22	Never Let Me Go	978-0-7546-9543-1	2011-09-23	5	5	9
23	All Quiet on the Western Front	978-0-214-65724-5	2010-07-11	815	815	8
\.


--
-- Data for Name: book_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book_authors ("bookId", "authorId") FROM stdin;
1	10
2	1
3	8
4	1
5	3
6	10
7	7
8	2
9	9
10	5
11	4
12	9
13	9
14	8
15	2
16	5
17	10
18	10
19	7
20	9
21	5
22	4
23	3
\.


--
-- Data for Name: book_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book_genres ("bookId", "genreId") FROM stdin;
1	2
2	5
3	2
4	3
5	5
6	2
7	6
8	2
9	5
10	3
11	1
12	2
13	4
14	3
15	5
16	6
17	2
18	6
19	3
20	6
21	1
22	4
23	12
\.


--
-- Data for Name: borrow_record; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.borrow_record (id, "bookId", "borrowerId", "borrowedAt", "returnedAt") FROM stdin;
1	5	7	2025-08-19 18:47:17.408+00	\N
2	2	11	2025-08-19 19:27:11.923+00	\N
3	5	5	2025-08-19 19:27:11.923+00	\N
4	4	9	2025-08-19 19:27:11.923+00	\N
5	13	6	2025-08-19 19:27:11.923+00	\N
6	20	9	2025-08-19 19:27:11.923+00	\N
7	13	10	2025-08-19 19:27:11.923+00	\N
8	10	6	2025-08-19 19:27:11.923+00	\N
9	4	4	2025-08-19 19:39:37.181+00	\N
10	13	4	2025-08-19 19:39:37.181+00	\N
11	20	4	2025-08-19 21:37:08.411+00	\N
12	23	2	2025-08-20 21:19:47.873+00	\N
13	23	2	2025-08-20 21:19:47.873+00	\N
14	23	12	2025-08-20 21:36:20.704+00	\N
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, name) FROM stdin;
1	Horror
2	Biography
3	Comedy
4	Romance
5	Classic
6	Poetry
12	Fantasy
\.


--
-- Data for Name: publisher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publisher (id, name, "establishedYear") FROM stdin;
1	Hahn - Paucek	2003
2	Hahn Group	2022
3	Carroll Inc	2008
4	Frami - Stracke	1989
5	Lockman - Koepp	1990
6	Moore LLC	2020
7	Ziemann - Treutel	2002
8	Jacobs, Mertz and Pollich	2012
9	Mraz and Sons	2010
10	Bauch, Bayer and Lebsack	1994
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, email, role, password) FROM stdin;
1	Marco Mertz Sr.	Dayne.Aufderhar6@hotmail.com	ADMIN	$2b$10$fxn4BYc/DNqjOxXogQ84xOu6CbtjheHAbBLb2DjUzsUq7hoZufA1W
2	Theresa Gutkowski	Jayne.Treutel@gmail.com	USER	$2b$10$tYLPGMNQpUMraMivJXBl3uULNGUyPAzVr7OdwRBdDM1LnUeK0ubJy
3	Leroy Lesch	Leda_Hills@hotmail.com	USER	$2b$10$vuoy7hO1ZHffCj/QsL63AO/ITVuSqe86zfhl/aqjsQ.CNxaw4qCnW
4	Iris Ullrich	Deontae39@yahoo.com	ADMIN	$2b$10$gb6Om9Q5odqNmRRNutUH6.9Nu.ZbkZfSLcyQHggd33USjv0hIDd7m
5	Marjorie Rohan	Forrest_Beier-Paucek47@gmail.com	USER	$2b$10$mEy/VDRWZyK3zpxNKhiNneVSICguH6J.Yn.gYr3tTY9Q0ufWv1e3K
6	Deanna Moen	Madelynn27@yahoo.com	USER	$2b$10$YXha1ef49EFYq7yh3i9nD.S2vWc8GGMS52xyRdV5/K88oROPteOgO
7	Rene Carroll	Jerel_Hermiston@yahoo.com	USER	$2b$10$031dKFBdwXCMlmRMkMBHaeBRo43at4jXWfbb5yOnZvdTmV7syLDeO
8	Kelli Dibbert DVM	Christa.Luettgen@gmail.com	USER	$2b$10$4CzuUybAB60iB8WGRO5KR.Gr6FdoKyoZiLBGryRIRTEDMwzm13qEC
9	Bert Cassin	Sincere_Langworth@gmail.com	USER	$2b$10$jQn86BO9UpIbEpH69/P3muP0WkcJygQLicxn0oziScNHAm0/KN0NO
10	Lena Dibbert	Virgil.Farrell14@gmail.com	USER	$2b$10$tUGiaful6uk.JDzcCDxOIuCe8QX3yU32DIEd1y6.NV2H4TLvW16e.
11	Wade Langworth Jr.	Olga91@yahoo.com	USER	$2b$10$047Gd27A.5cz3x63uQbT3Oi.wxV.Lw.fxtywEi5PJzxmxHO92SmXq
12	maks maks	maks@maks.com	ADMIN	$2b$10$/hQiTYxu/PV10ydhByLvSeTlNbQYuZg574EYWWGtq7YPLWyiUTV.2
\.


--
-- Name: author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.author_id_seq', 11, true);


--
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_id_seq', 25, true);


--
-- Name: borrow_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.borrow_record_id_seq', 14, true);


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 13, true);


--
-- Name: publisher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publisher_id_seq', 11, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 12, true);


--
-- Name: genre PK_0285d4f1655d080cfcf7d1ab141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY (id);


--
-- Name: book_authors PK_167ae201537b9bc226186c57a36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT "PK_167ae201537b9bc226186c57a36" PRIMARY KEY ("bookId", "authorId");


--
-- Name: book_genres PK_38b19168b3ad81851b5596cb633; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT "PK_38b19168b3ad81851b5596cb633" PRIMARY KEY ("bookId", "genreId");


--
-- Name: author PK_5a0e79799d372fe56f2f3fa6871; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY (id);


--
-- Name: author_books_book PK_6b6bf224c7ce78773e95bded3f2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author_books_book
    ADD CONSTRAINT "PK_6b6bf224c7ce78773e95bded3f2" PRIMARY KEY ("authorId", "bookId");


--
-- Name: publisher PK_70a5936b43177f76161724da3e6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publisher
    ADD CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY (id);


--
-- Name: book PK_a3afef72ec8f80e6e5c310b28a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id);


--
-- Name: borrow_record PK_bed177a8cdcca94d5adeebdc52c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow_record
    ADD CONSTRAINT "PK_bed177a8cdcca94d5adeebdc52c" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: author UQ_538956b41630ade33924e58dc72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT "UQ_538956b41630ade33924e58dc72" UNIQUE ("fullName");


--
-- Name: publisher UQ_9dc496f2e5b912da9edd2aa4455; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publisher
    ADD CONSTRAINT "UQ_9dc496f2e5b912da9edd2aa4455" UNIQUE (name);


--
-- Name: book UQ_bd183604b9c828c0bdd92cafab7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE (isbn);


--
-- Name: genre UQ_dd8cd9e50dd049656e4be1f7e8c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE (name);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_34342925729041ac5301b289a9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_34342925729041ac5301b289a9" ON public.author_books_book USING btree ("bookId");


--
-- Name: IDX_346e0792ef07fd64c9faf856a5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_346e0792ef07fd64c9faf856a5" ON public.book_genres USING btree ("genreId");


--
-- Name: IDX_3d7277e26c03e07fe1ad1dd315; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3d7277e26c03e07fe1ad1dd315" ON public.book_genres USING btree ("bookId");


--
-- Name: IDX_7afd39332b56e49bdfdf8046ef; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_7afd39332b56e49bdfdf8046ef" ON public.book_authors USING btree ("authorId");


--
-- Name: IDX_8433d38595493ad358f0cb0a58; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_8433d38595493ad358f0cb0a58" ON public.book_authors USING btree ("bookId");


--
-- Name: IDX_e9ac29df6d093aa0b8079f1d15; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e9ac29df6d093aa0b8079f1d15" ON public.author_books_book USING btree ("authorId");


--
-- Name: author_books_book FK_34342925729041ac5301b289a9a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author_books_book
    ADD CONSTRAINT "FK_34342925729041ac5301b289a9a" FOREIGN KEY ("bookId") REFERENCES public.book(id);


--
-- Name: book_genres FK_346e0792ef07fd64c9faf856a56; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT "FK_346e0792ef07fd64c9faf856a56" FOREIGN KEY ("genreId") REFERENCES public.genre(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: book_genres FK_3d7277e26c03e07fe1ad1dd315f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT "FK_3d7277e26c03e07fe1ad1dd315f" FOREIGN KEY ("bookId") REFERENCES public.book(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: book_authors FK_7afd39332b56e49bdfdf8046ef2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT "FK_7afd39332b56e49bdfdf8046ef2" FOREIGN KEY ("authorId") REFERENCES public.author(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: borrow_record FK_8032acbf1eb063876edcf49e96c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow_record
    ADD CONSTRAINT "FK_8032acbf1eb063876edcf49e96c" FOREIGN KEY ("bookId") REFERENCES public.book(id);


--
-- Name: book_authors FK_8433d38595493ad358f0cb0a581; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT "FK_8433d38595493ad358f0cb0a581" FOREIGN KEY ("bookId") REFERENCES public.book(id);


--
-- Name: borrow_record FK_a245f3602cd4827440027cd390f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow_record
    ADD CONSTRAINT "FK_a245f3602cd4827440027cd390f" FOREIGN KEY ("borrowerId") REFERENCES public."user"(id);


--
-- Name: book FK_b8988524dd01b5dcb67b4b3ede7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "FK_b8988524dd01b5dcb67b4b3ede7" FOREIGN KEY ("publisherId") REFERENCES public.publisher(id);


--
-- Name: author_books_book FK_e9ac29df6d093aa0b8079f1d151; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author_books_book
    ADD CONSTRAINT "FK_e9ac29df6d093aa0b8079f1d151" FOREIGN KEY ("authorId") REFERENCES public.author(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 2YradMln9b0fDC7jiiCKVbwedNXmMTf1EestNtVNnlm6lYCydU5Xclnce9QBfQg

