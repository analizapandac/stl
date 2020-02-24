--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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
-- Name: enum_Orders_status; Type: TYPE; Schema: public; Owner: ccdqxhps
--

CREATE TYPE public."enum_Orders_status" AS ENUM (
    'created',
    'confirmed',
    'cancelled',
    'delivered'
);


ALTER TYPE public."enum_Orders_status" OWNER TO ccdqxhps;

--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: ccdqxhps
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'created',
    'confirmed',
    'cancelled',
    'delivered'
);


ALTER TYPE public.enum_orders_status OWNER TO ccdqxhps;

--
-- Name: status; Type: TYPE; Schema: public; Owner: ccdqxhps
--

CREATE TYPE public.status AS ENUM (
    'created',
    'confirmed',
    'cancelled',
    'delivered'
);


ALTER TYPE public.status OWNER TO ccdqxhps;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Orders; Type: TABLE; Schema: public; Owner: ccdqxhps
--

CREATE TABLE public."Orders" (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    status public."enum_Orders_status" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Orders" OWNER TO ccdqxhps;

--
-- Name: Orders_id_seq; Type: SEQUENCE; Schema: public; Owner: ccdqxhps
--

CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Orders_id_seq" OWNER TO ccdqxhps;

--
-- Name: Orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ccdqxhps
--

ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: ccdqxhps
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO ccdqxhps;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: ccdqxhps
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO ccdqxhps;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ccdqxhps
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: ccdqxhps
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(255),
    price numeric,
    updated_at timestamp without time zone,
    created_at timestamp without time zone
);


ALTER TABLE public.items OWNER TO ccdqxhps;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: ccdqxhps
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    item_id integer NOT NULL,
    order_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.order_items OWNER TO ccdqxhps;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: ccdqxhps
--

CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO ccdqxhps;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ccdqxhps
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: ccdqxhps
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    status public.status,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    total numeric NOT NULL
);


ALTER TABLE public.orders OWNER TO ccdqxhps;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: ccdqxhps
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO ccdqxhps;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ccdqxhps
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ccdqxhps
--

CREATE TABLE public.users (
    id integer NOT NULL,
    lastname character varying(255),
    firstname character varying(255),
    email character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO ccdqxhps;

--
-- Name: Orders id; Type: DEFAULT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: ccdqxhps
--

COPY public."Orders" (id, customer_id, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: ccdqxhps
--

COPY public."Users" (id, firstname, lastname, email, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: ccdqxhps
--

COPY public.items (id, name, price, updated_at, created_at) FROM stdin;
1	Mug	100	\N	\N
2	pen holder	5	\N	\N
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: ccdqxhps
--

COPY public.order_items (id, item_id, order_id, created_at, updated_at) FROM stdin;
1	1	1	\N	\N
2	1	8	2020-02-23 12:12:03.313	2020-02-23 12:12:03.313
3	2	9	2020-02-23 12:13:15.973	2020-02-23 12:13:15.973
4	2	10	2020-02-23 12:20:01.461	2020-02-23 12:20:01.461
5	1	11	2020-02-23 12:20:32.89	2020-02-23 12:20:32.89
6	2	11	2020-02-23 12:20:32.89	2020-02-23 12:20:32.89
7	1	12	2020-02-23 12:21:58.356	2020-02-23 12:21:58.356
8	2	12	2020-02-23 12:21:58.356	2020-02-23 12:21:58.356
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: ccdqxhps
--

COPY public.orders (id, customer_id, status, created_at, updated_at, total) FROM stdin;
1	1	created	2020-02-23 16:17:29.197819	2020-02-23 16:17:29.197819	100
2	1	created	2020-02-23 11:43:40.464	2020-02-23 11:43:40.464	100
3	1	created	2020-02-23 11:47:18.393	2020-02-23 11:47:18.393	100
4	1	created	2020-02-23 11:49:55.828	2020-02-23 11:49:55.828	100
5	1	created	2020-02-23 12:00:27.833	2020-02-23 12:00:27.833	100
6	1	created	2020-02-23 12:08:14.46	2020-02-23 12:08:14.46	100
7	1	created	2020-02-23 12:10:29.936	2020-02-23 12:10:29.936	100
8	1	created	2020-02-23 12:12:03.304	2020-02-23 12:12:03.304	100
9	1	created	2020-02-23 12:13:15.964	2020-02-23 12:13:15.964	100
10	1	created	2020-02-23 12:20:01.451	2020-02-23 12:20:01.451	5
11	1	created	2020-02-23 12:20:32.886	2020-02-23 12:20:32.886	1005
12	1	created	2020-02-23 12:21:58.347	2020-02-23 12:21:58.347	105
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ccdqxhps
--

COPY public.users (id, lastname, firstname, email, created_at, updated_at) FROM stdin;
1	ana	liza	analiza@gmail.com	\N	\N
\.


--
-- Name: Orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ccdqxhps
--

SELECT pg_catalog.setval('public."Orders_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ccdqxhps
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ccdqxhps
--

SELECT pg_catalog.setval('public.order_items_id_seq', 8, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ccdqxhps
--

SELECT pg_catalog.setval('public.orders_id_seq', 12, true);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_fk FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: order_items orders_fk; Type: FK CONSTRAINT; Schema: public; Owner: ccdqxhps
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT orders_fk FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- PostgreSQL database dump complete
--

