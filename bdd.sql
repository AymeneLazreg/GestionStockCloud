/*
 Navicat Premium Dump SQL

 Source Server         : postgre
 Source Server Type    : PostgreSQL
 Source Server Version : 170003 (170003)
 Source Host           : localhost:5432
 Source Catalog        : projet
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170003 (170003)
 File Encoding         : 65001

 Date: 24/04/2025 21:14:23
*/


-- ----------------------------
-- Type structure for enum_mouvement_action
-- ----------------------------
DROP TYPE IF EXISTS "public"."enum_mouvement_action";
CREATE TYPE "public"."enum_mouvement_action" AS ENUM (
  'Entrée',
  'Sortie'
);

-- ----------------------------
-- Sequence structure for CommandeFournisseurs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."CommandeFournisseurs_id_seq";
CREATE SEQUENCE "public"."CommandeFournisseurs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for LigneCommandeFournisseur_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."LigneCommandeFournisseur_id_seq";
CREATE SEQUENCE "public"."LigneCommandeFournisseur_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for commandes_fournisseur_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."commandes_fournisseur_id_seq";
CREATE SEQUENCE "public"."commandes_fournisseur_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for lignes_commande_fournisseur_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."lignes_commande_fournisseur_id_seq";
CREATE SEQUENCE "public"."lignes_commande_fournisseur_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for mouvement_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."mouvement_id_seq";
CREATE SEQUENCE "public"."mouvement_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for produit_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."produit_id_seq";
CREATE SEQUENCE "public"."produit_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for produit_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."produit_id_seq1";
CREATE SEQUENCE "public"."produit_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for utilisateurs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."utilisateurs_id_seq";
CREATE SEQUENCE "public"."utilisateurs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for CartonProduit
-- ----------------------------
DROP TABLE IF EXISTS "public"."CartonProduit";
CREATE TABLE "public"."CartonProduit" (
  "id_carton" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "date_expiration" date NOT NULL,
  "quantite" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of CartonProduit
-- ----------------------------

-- ----------------------------
-- Table structure for categorie
-- ----------------------------
DROP TABLE IF EXISTS "public"."categorie";
CREATE TABLE "public"."categorie" (
  "id" int4 NOT NULL,
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of categorie
-- ----------------------------
INSERT INTO "public"."categorie" VALUES (1, 'Alimentaire', 'H');
INSERT INTO "public"."categorie" VALUES (2, 'Fruits', 'Fr');
INSERT INTO "public"."categorie" VALUES (3, 'Legumes', 'lg');

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS "public"."client";
CREATE TABLE "public"."client" (
  "id" int4 NOT NULL,
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "telephone" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adresse" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of client
-- ----------------------------

-- ----------------------------
-- Table structure for commandes_fournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."commandes_fournisseur";
CREATE TABLE "public"."commandes_fournisseur" (
  "id" int4 NOT NULL DEFAULT nextval('commandes_fournisseur_id_seq'::regclass),
  "date_commande" date NOT NULL,
  "statut" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'En Attente'::character varying,
  "date_validation" timestamptz(6),
  "montant_totale" float8 NOT NULL DEFAULT '0'::double precision,
  "fournisseur" int4 NOT NULL
)
;

-- ----------------------------
-- Records of commandes_fournisseur
-- ----------------------------
INSERT INTO "public"."commandes_fournisseur" VALUES (1, '2025-04-18', 'Validée', '2025-04-18 14:42:22.49+02', 18, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (3, '2025-04-18', 'Validée', '2025-04-18 14:56:07.427+02', 30207, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (4, '2025-04-22', 'Validée', '2025-04-22 01:44:50.702+02', 3, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (5, '2025-04-22', 'Validée', '2025-04-22 01:47:28.657+02', 172830, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (2, '2025-04-18', 'Validée', '2025-04-22 17:32:35.073+02', 1499, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (7, '2025-04-24', 'Validée', '2025-04-24 17:13:48.21+02', 123450, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (8, '2025-04-24', 'Validée', '2025-04-24 18:56:51.789+02', 3, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (11, '2025-04-24', 'Validée', '2025-04-24 19:27:36.246+02', 123450, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (13, '2025-04-24', 'Validée', '2025-04-24 19:46:36.079+02', 47034, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (14, '2025-04-24', 'Validée', '2025-04-24 19:47:09.109+02', 299997, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (15, '2025-04-24', 'Validée', '2025-04-24 19:50:38.153+02', 5997, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (16, '2025-04-24', 'Validée', '2025-04-24 20:47:38.734+02', 300, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (18, '2025-04-24', 'Validée', '2025-04-24 21:04:26.818+02', 300, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (19, '2025-04-24', 'Validée', '2025-04-24 21:10:50.926+02', 3400, 1);
INSERT INTO "public"."commandes_fournisseur" VALUES (20, '2025-04-24', 'Validée', '2025-04-24 21:12:14.822+02', 3700, 1);

-- ----------------------------
-- Table structure for facture
-- ----------------------------
DROP TABLE IF EXISTS "public"."facture";
CREATE TABLE "public"."facture" (
  "id" int4 NOT NULL,
  "date" date,
  "montant_totale" varchar(255) COLLATE "pg_catalog"."default",
  "statut" varchar(255) COLLATE "pg_catalog"."default",
  "commande_client" int4
)
;

-- ----------------------------
-- Records of facture
-- ----------------------------

-- ----------------------------
-- Table structure for fournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."fournisseur";
CREATE TABLE "public"."fournisseur" (
  "id" int4 NOT NULL,
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adresse" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "telephone" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of fournisseur
-- ----------------------------
INSERT INTO "public"."fournisseur" VALUES (1, 'AZERT', 'ZERTY', 'ZERTy', '34567');

-- ----------------------------
-- Table structure for lignes_commande_fournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."lignes_commande_fournisseur";
CREATE TABLE "public"."lignes_commande_fournisseur" (
  "id" int4 NOT NULL DEFAULT nextval('lignes_commande_fournisseur_id_seq'::regclass),
  "produit" int4 NOT NULL,
  "quantité" int4 NOT NULL,
  "prix_unitaire" float8 NOT NULL,
  "commande" int4 NOT NULL
)
;

-- ----------------------------
-- Records of lignes_commande_fournisseur
-- ----------------------------
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (1, 5, 1, 3, 1);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (2, 5, 5, 3, 1);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (3, 5, 1, 3, 2);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (4, 5, 1, 3, 3);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (5, 5, 69, 3, 3);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (6, 5, 9999, 3, 3);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (7, 5, 1, 3, 4);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (8, 6, 14, 12345, 5);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (9, 7, 44, 34, 2);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (10, 6, 10, 12345, 7);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (13, 5, 1, 3, 8);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (14, 6, 10, 12345, 11);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (16, 5, 15678, 3, 13);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (17, 5, 99999, 3, 14);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (18, 5, 1999, 3, 15);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (19, 5, 100, 3, 16);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (21, 5, 100, 3, 18);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (22, 5, 100, 3, 18);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (23, 7, 100, 34, 19);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (24, 7, 100, 34, 19);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (25, 5, 100, 3, 20);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (26, 7, 100, 34, 20);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (27, 5, 100, 3, 20);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (28, 7, 100, 34, 20);

-- ----------------------------
-- Table structure for mouvement
-- ----------------------------
DROP TABLE IF EXISTS "public"."mouvement";
CREATE TABLE "public"."mouvement" (
  "id" int4 NOT NULL DEFAULT nextval('mouvement_id_seq'::regclass),
  "produit" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "action" "public"."enum_mouvement_action" NOT NULL,
  "quantite" int4 NOT NULL,
  "date" date NOT NULL,
  "utilisateur_id" int4
)
;

-- ----------------------------
-- Records of mouvement
-- ----------------------------
INSERT INTO "public"."mouvement" VALUES (38, 'Patate', 'Entrée', 50, '2025-04-17', 5);
INSERT INTO "public"."mouvement" VALUES (39, 'Patate', 'Sortie', 25, '2025-04-17', 5);
INSERT INTO "public"."mouvement" VALUES (40, 'Patate', 'Sortie', 10, '2025-04-17', 5);
INSERT INTO "public"."mouvement" VALUES (41, 'Patate', 'Entrée', 20, '2025-04-17', 5);
INSERT INTO "public"."mouvement" VALUES (42, 'SDGFDF', 'Entrée', 23456, '2025-04-21', 6);
INSERT INTO "public"."mouvement" VALUES (43, 'SDGFDF', 'Sortie', 23222, '2025-04-21', 6);
INSERT INTO "public"."mouvement" VALUES (44, 'Produit X', 'Entrée', 15, '2025-04-22', 5);
INSERT INTO "public"."mouvement" VALUES (45, 'Patate', 'Sortie', 35, '2025-04-24', 5);
INSERT INTO "public"."mouvement" VALUES (46, 'Produit X', 'Sortie', 13, '2025-04-24', 5);
INSERT INTO "public"."mouvement" VALUES (47, 'Patate', 'Entrée', 100, '2025-04-24', 5);
INSERT INTO "public"."mouvement" VALUES (48, 'Produit X', 'Entrée', 100, '2025-04-24', 5);
INSERT INTO "public"."mouvement" VALUES (49, 'Patate', 'Entrée', 100, '2025-04-24', 5);
INSERT INTO "public"."mouvement" VALUES (50, 'Produit X', 'Entrée', 100, '2025-04-24', 5);

-- ----------------------------
-- Table structure for paiement
-- ----------------------------
DROP TABLE IF EXISTS "public"."paiement";
CREATE TABLE "public"."paiement" (
  "id" int4 NOT NULL,
  "date_paiement" date,
  "montant" float4,
  "mode_paiement" varchar(255) COLLATE "pg_catalog"."default",
  "facture" int4
)
;

-- ----------------------------
-- Records of paiement
-- ----------------------------

-- ----------------------------
-- Table structure for produit
-- ----------------------------
DROP TABLE IF EXISTS "public"."produit";
CREATE TABLE "public"."produit" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "prix" float8 NOT NULL,
  "quantite_stock" int4 NOT NULL,
  "categorie" int4 NOT NULL,
  "codebar" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of produit
-- ----------------------------
INSERT INTO "public"."produit" VALUES (6, 'SDGFDF', 'é"''(-è', 12345, 234, 1, '3456789');
INSERT INTO "public"."produit" VALUES (5, 'Patate', 'Patate douce', 3, 200, 3, '');
INSERT INTO "public"."produit" VALUES (7, 'Produit X', 'Description produit X', 34, 202, 1, '');

-- ----------------------------
-- Table structure for utilisateurs
-- ----------------------------
DROP TABLE IF EXISTS "public"."utilisateurs";
CREATE TABLE "public"."utilisateurs" (
  "id" int4 NOT NULL DEFAULT nextval('utilisateurs_id_seq'::regclass),
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mdp" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "role" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'Employe'::character varying
)
;

-- ----------------------------
-- Records of utilisateurs
-- ----------------------------
INSERT INTO "public"."utilisateurs" VALUES (5, 'aymene LAZREG', 'aymenlazreg4@gmail.com', '$2b$10$DdWyx2VQmtD8WyqRrtRyPOstBN3YuxRjaHLsvltCfx9OBMmcX434K', 'admin');
INSERT INTO "public"."utilisateurs" VALUES (6, 'Yanis Dahmouche', 'yanischkopi@gmail.com', '$2b$10$nhADOJaakECYRumd1h6RF.8L.wighIr8jaGJPXPzK/qGhLgZlxm6G', 'gestionnaire');
INSERT INTO "public"."utilisateurs" VALUES (7, 'Super Admin', 'admin@admin.com', '$2b$10$TNUFukAmu97IQCm07U9aLex1QZ.4YPHLtNXMWHIj8CVFo.OkBNxB.', 'client');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."CommandeFournisseurs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."LigneCommandeFournisseur_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."commandes_fournisseur_id_seq"
OWNED BY "public"."commandes_fournisseur"."id";
SELECT setval('"public"."commandes_fournisseur_id_seq"', 20, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."lignes_commande_fournisseur_id_seq"
OWNED BY "public"."lignes_commande_fournisseur"."id";
SELECT setval('"public"."lignes_commande_fournisseur_id_seq"', 28, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."mouvement_id_seq"
OWNED BY "public"."mouvement"."id";
SELECT setval('"public"."mouvement_id_seq"', 50, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq"', 21, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq1"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq1"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."utilisateurs_id_seq"
OWNED BY "public"."utilisateurs"."id";
SELECT setval('"public"."utilisateurs_id_seq"', 7, true);

-- ----------------------------
-- Primary Key structure for table CartonProduit
-- ----------------------------
ALTER TABLE "public"."CartonProduit" ADD CONSTRAINT "CartonProduit_pkey" PRIMARY KEY ("id_carton");

-- ----------------------------
-- Primary Key structure for table categorie
-- ----------------------------
ALTER TABLE "public"."categorie" ADD CONSTRAINT "categorie_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table client
-- ----------------------------
ALTER TABLE "public"."client" ADD CONSTRAINT "client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table commandes_fournisseur
-- ----------------------------
ALTER TABLE "public"."commandes_fournisseur" ADD CONSTRAINT "commandes_fournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table facture
-- ----------------------------
ALTER TABLE "public"."facture" ADD CONSTRAINT "chk_status" CHECK (statut::text = ANY (ARRAY['paye'::character varying::text, 'impaye'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table facture
-- ----------------------------
ALTER TABLE "public"."facture" ADD CONSTRAINT "facture_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table fournisseur
-- ----------------------------
ALTER TABLE "public"."fournisseur" ADD CONSTRAINT "fournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table lignes_commande_fournisseur
-- ----------------------------
ALTER TABLE "public"."lignes_commande_fournisseur" ADD CONSTRAINT "lignes_commande_fournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table mouvement
-- ----------------------------
ALTER TABLE "public"."mouvement" ADD CONSTRAINT "mouvement_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table paiement
-- ----------------------------
ALTER TABLE "public"."paiement" ADD CONSTRAINT "chk_payement" CHECK (mode_paiement::text = ANY (ARRAY['Carte'::character varying::text, 'Especes'::character varying::text, 'Virement'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table paiement
-- ----------------------------
ALTER TABLE "public"."paiement" ADD CONSTRAINT "paiement_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for produit
-- ----------------------------
SELECT setval('"public"."produit_id_seq1"', 7, true);

-- ----------------------------
-- Primary Key structure for table produit
-- ----------------------------
ALTER TABLE "public"."produit" ADD CONSTRAINT "produit_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table utilisateurs
-- ----------------------------
ALTER TABLE "public"."utilisateurs" ADD CONSTRAINT "utilisateurs_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table utilisateurs
-- ----------------------------
ALTER TABLE "public"."utilisateurs" ADD CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table commandes_fournisseur
-- ----------------------------
ALTER TABLE "public"."commandes_fournisseur" ADD CONSTRAINT "commandes_fournisseur_fournisseur_fkey" FOREIGN KEY ("fournisseur") REFERENCES "public"."fournisseur" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table lignes_commande_fournisseur
-- ----------------------------
ALTER TABLE "public"."lignes_commande_fournisseur" ADD CONSTRAINT "lignes_commande_fournisseur_commande_fkey" FOREIGN KEY ("commande") REFERENCES "public"."commandes_fournisseur" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."lignes_commande_fournisseur" ADD CONSTRAINT "lignes_commande_fournisseur_produit_fkey" FOREIGN KEY ("produit") REFERENCES "public"."produit" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table mouvement
-- ----------------------------
ALTER TABLE "public"."mouvement" ADD CONSTRAINT "fk_utilisateur" FOREIGN KEY ("utilisateur_id") REFERENCES "public"."utilisateurs" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table paiement
-- ----------------------------
ALTER TABLE "public"."paiement" ADD CONSTRAINT "facture" FOREIGN KEY ("facture") REFERENCES "public"."facture" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table produit
-- ----------------------------
ALTER TABLE "public"."produit" ADD CONSTRAINT "categories" FOREIGN KEY ("categorie") REFERENCES "public"."categorie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
