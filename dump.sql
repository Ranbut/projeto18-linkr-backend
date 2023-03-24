--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: toggle_like(numeric, numeric); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.toggle_like(post_id numeric, user_id numeric) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE
    row_exists NUMERIC;
BEGIN

    SELECT 1 
    INTO row_exists 
    FROM likes
    WHERE likes."postId" = post_id and likes."userId" = user_id;

    IF (row_exists > 0) THEN
        DELETE FROM likes WHERE likes."postId" = post_id and likes."userId" = user_id;
        RETURN 0;
    ELSE
        INSERT INTO likes ("postId", "userId") VALUES(post_id, user_id);
        RETURN 1;
    END IF;

END; 
$$;


--
-- Name: toggle_share(numeric, numeric); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.toggle_share("post_Id" numeric, "user_Id" numeric) RETURNS numeric
    LANGUAGE plpgsql
    AS $$DECLARE
    sharedrow_exists NUMERIC;
BEGIN

    SELECT 1 
    INTO sharedrow_exists 
    FROM "sharedPosts"
    WHERE "sharedPosts"."postId" = "post_Id" and "sharedPosts"."userId" = "user_Id";

    IF (sharedrow_exists > 0) THEN
        DELETE FROM "sharedPosts" 
		WHERE "sharedPosts"."postId" = "post_Id" and "sharedPosts"."userId" = "user_Id";
        RETURN 0;
    ELSE
        INSERT INTO "sharedPosts" ("postId", "userId") 
		VALUES("post_Id", "user_Id");
        RETURN 1;
    END IF;

END;$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    "userId" integer,
    "followId" integer,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    hashtag character varying(255) NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: messagesHashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."messagesHashtags" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL
);


--
-- Name: messagesHashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."messagesHashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messagesHashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."messagesHashtags_id_seq" OWNED BY public."messagesHashtags".id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    message text NOT NULL,
    link text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "repostUserId" integer
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(60) NOT NULL,
    "createdAt" bigint NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: sharedPosts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."sharedPosts" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(80) NOT NULL,
    username character varying(30) NOT NULL,
    "pictureUrl" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: usersPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usersPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersPosts_id_seq" OWNED BY public."sharedPosts".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: view_likes_count; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.view_likes_count AS
 SELECT posts.id,
    count(likes.id) AS "likeCount"
   FROM (public.posts
     LEFT JOIN public.likes ON ((likes."postId" = posts.id)))
  GROUP BY posts.id
  ORDER BY (count(likes.id)) DESC;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: messagesHashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."messagesHashtags" ALTER COLUMN id SET DEFAULT nextval('public."messagesHashtags_id_seq"'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: sharedPosts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."sharedPosts" ALTER COLUMN id SET DEFAULT nextval('public."usersPosts_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 67, 7, '<3', '2023-03-23 22:09:24.433092');


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (93, '#noticias');
INSERT INTO public.hashtags VALUES (94, '#tech');
INSERT INTO public.hashtags VALUES (95, '#teste');
INSERT INTO public.hashtags VALUES (96, '#teste2');
INSERT INTO public.hashtags VALUES (99, '#hashtag');
INSERT INTO public.hashtags VALUES (101, '#projeto');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (15, 68, 7, '2023-03-23 22:09:49.009386');
INSERT INTO public.likes VALUES (16, 67, 7, '2023-03-23 22:09:50.172648');
INSERT INTO public.likes VALUES (23, 69, 6, '2023-03-24 00:25:27.766312');


--
-- Data for Name: messagesHashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."messagesHashtags" VALUES (9, 66, 99);
INSERT INTO public."messagesHashtags" VALUES (11, 68, 101);
INSERT INTO public."messagesHashtags" VALUES (12, 69, 101);
INSERT INTO public."messagesHashtags" VALUES (13, 70, 96);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (66, 6, 'meu novo projeto #hashtag', 'https://github.com/drebraga/projeto18-linkr-frontend', '2023-03-23 21:58:38.537732', NULL);
INSERT INTO public.posts VALUES (68, 6, '#projeto', 'https://github.com/drebraga/projeto18-linkr-frontend', '2023-03-23 21:59:07.350109', NULL);
INSERT INTO public.posts VALUES (69, 7, '#projeto', 'https://github.com/drebraga/gamestore-front', '2023-03-23 22:00:15.580868', NULL);
INSERT INTO public.posts VALUES (70, 7, '#teste2', 'https://github.com/drebraga/gamestore-front', '2023-03-23 22:00:22.297204', NULL);
INSERT INTO public.posts VALUES (67, 6, 'oie', 'https://github.com/drebraga/projeto18-linkr-frontend', '2023-03-23 21:58:52.41295', NULL);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (63, 6, '637e4bc1-80dd-47c3-b19b-8f4455b94190', 1679638192621);


--
-- Data for Name: sharedPosts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."sharedPosts" VALUES (13, 70, 6, '2023-03-24 00:30:48.343557');
INSERT INTO public."sharedPosts" VALUES (14, 67, 6, '2023-03-24 00:30:58.680816');
INSERT INTO public."sharedPosts" VALUES (15, 67, 7, '2023-03-24 03:09:44.328772');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (3, 'email@gmail.com', '$2b$10$kRSu6H.fdAvjwoAf1QUj2OOI.Ma2qCrvtNwHyBwDej8HccGJvKMiS', 'emailkk', 'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e', '2023-03-08 15:08:04.595033');
INSERT INTO public.users VALUES (4, 'email1@gmail.com', '$2b$10$LKXno7xmWyNNPLka.0guK.XiYsYpbTVMDxd96BTECB1DxAc9ujq5y', 'emailk', 'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e', '2023-03-08 15:08:04.595033');
INSERT INTO public.users VALUES (5, 'email2@gmail.com', '$2b$10$I2T/kxNP/bGJaGP7BhHhHecyZ4i/qMzTmA5LaGK.rzGbKSLB6TKmG', 'danne', 'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e', '2023-03-08 15:08:04.595033');
INSERT INTO public.users VALUES (6, 'andre@andre.com', '$2b$10$tI6M6Y1V2f8f16wOxTsOZ.XyYtuTVyCH4FYrf.J6/0Q4yIrlvrvjG', 'andre', 'https://img.freepik.com/vetores-premium/homem-perfil-caricatura_18591-58482.jpg?w=2000', '2023-03-22 09:08:42.389447');
INSERT INTO public.users VALUES (7, 'andre2@andre.com', '$2b$10$//3L06hY5TsoOSzbxqApWOBBgGrQ6Zxl4WA.syVOmRFpLAUwoo7EW', 'andre2', 'https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg', '2023-03-23 21:59:50.467859');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 1, false);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 103, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 23, true);


--
-- Name: messagesHashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."messagesHashtags_id_seq"', 13, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 70, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 63, true);


--
-- Name: usersPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersPosts_id_seq"', 15, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtag; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtag UNIQUE (hashtag);


--
-- Name: hashtags hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pk PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: likes likes_postId_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_userId_key" UNIQUE ("postId", "userId");


--
-- Name: messagesHashtags messagesHashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."messagesHashtags"
    ADD CONSTRAINT "messagesHashtags_pk" PRIMARY KEY (id);


--
-- Name: posts posts_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sharedPosts usersPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."sharedPosts"
    ADD CONSTRAINT "usersPosts_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: followers followers_followId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_followId_fkey" FOREIGN KEY ("followId") REFERENCES public.users(id);


--
-- Name: followers followers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: messagesHashtags messagesHashtags_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."messagesHashtags"
    ADD CONSTRAINT "messagesHashtags_fk0" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: messagesHashtags messagesHashtags_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."messagesHashtags"
    ADD CONSTRAINT "messagesHashtags_fk1" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags(id);


--
-- Name: posts posts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sharedPosts sharedPosts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."sharedPosts"
    ADD CONSTRAINT "sharedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) NOT VALID;


--
-- Name: sharedPosts usersPosts_postUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."sharedPosts"
    ADD CONSTRAINT "usersPosts_postUserId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

