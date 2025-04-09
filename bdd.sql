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

 Date: 09/04/2025 13:49:06
*/


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
-- Table structure for CommandesClient
-- ----------------------------
DROP TABLE IF EXISTS "public"."CommandesClient";
CREATE TABLE "public"."CommandesClient" (
  "id" int4 NOT NULL,
  "date_commande" date,
  "statut" varchar(255) COLLATE "pg_catalog"."default",
  "montant_totale" float4,
  "client" int4
)
;

-- ----------------------------
-- Records of CommandesClient
-- ----------------------------

-- ----------------------------
-- Table structure for LigneCommandeClient
-- ----------------------------
DROP TABLE IF EXISTS "public"."LigneCommandeClient";
CREATE TABLE "public"."LigneCommandeClient" (
  "id" int4 NOT NULL,
  "produit" int4 NOT NULL,
  "quantite" int4 NOT NULL,
  "prix_unitaire" float4 NOT NULL,
  "commande" int4 NOT NULL
)
;

-- ----------------------------
-- Records of LigneCommandeClient
-- ----------------------------

-- ----------------------------
-- Table structure for LigneCommandeFournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."LigneCommandeFournisseur";
CREATE TABLE "public"."LigneCommandeFournisseur" (
  "id" int4 NOT NULL,
  "produit" int4 NOT NULL,
  "quantité" int4 NOT NULL,
  "prix_unitaire" float4 NOT NULL,
  "commande" int4 NOT NULL
)
;

-- ----------------------------
-- Records of LigneCommandeFournisseur
-- ----------------------------

-- ----------------------------
-- Table structure for StockMouvement
-- ----------------------------
DROP TABLE IF EXISTS "public"."StockMouvement";
CREATE TABLE "public"."StockMouvement" (
  "id" int4 NOT NULL,
  "type_mouvement" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "produit" int4 NOT NULL,
  "quantite" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "date" date NOT NULL,
  "utilisateur" int4 NOT NULL
)
;

-- ----------------------------
-- Records of StockMouvement
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
-- Table structure for commandeFournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."commandeFournisseur";
CREATE TABLE "public"."commandeFournisseur" (
  "id" int4 NOT NULL,
  "date_commande" date NOT NULL,
  "statut" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "montant_totale" float4 NOT NULL,
  "fournisseur" int4 NOT NULL
)
;

-- ----------------------------
-- Records of commandeFournisseur
-- ----------------------------

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
  "categorie" int4 NOT NULL
)
;

-- ----------------------------
-- Records of produit
-- ----------------------------
INSERT INTO "public"."produit" VALUES (1, 'Patate', 'jkhqlzdsuiflqisudhfl', 45, 55, 1);
INSERT INTO "public"."produit" VALUES (2, 'Banane', 'Fruits sec', 40, 14, 1);

-- ----------------------------
-- Table structure for utilisateur
-- ----------------------------
DROP TABLE IF EXISTS "public"."utilisateur";
CREATE TABLE "public"."utilisateur" (
  "id" int4 NOT NULL,
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mdp" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "role" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of utilisateur
-- ----------------------------

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
INSERT INTO "public"."utilisateurs" VALUES (1, 'Aymene Lazreg', 'Aymenla@gmail.com', '$2b$10$oDfm.EhqM59n1lkTtCBwIeV7OeMUsmofSNvZgROJGkl2S9DAtXLYe', 'utilisateur');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."utilisateurs_id_seq"
OWNED BY "public"."utilisateurs"."id";
SELECT setval('"public"."utilisateurs_id_seq"', 1, true);

-- ----------------------------
-- Primary Key structure for table CartonProduit
-- ----------------------------
ALTER TABLE "public"."CartonProduit" ADD CONSTRAINT "CartonProduit_pkey" PRIMARY KEY ("id_carton");

-- ----------------------------
-- Checks structure for table CommandesClient
-- ----------------------------
ALTER TABLE "public"."CommandesClient" ADD CONSTRAINT "chk_status" CHECK (statut::text = ANY (ARRAY['En Attente'::character varying::text, 'Valide'::character varying::text, 'Expedie'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table CommandesClient
-- ----------------------------
ALTER TABLE "public"."CommandesClient" ADD CONSTRAINT "LigneCommandesClient_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table LigneCommandeClient
-- ----------------------------
ALTER TABLE "public"."LigneCommandeClient" ADD CONSTRAINT "LigneCommandeClient_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table LigneCommandeFournisseur
-- ----------------------------
ALTER TABLE "public"."LigneCommandeFournisseur" ADD CONSTRAINT "LigneCommandeFournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table StockMouvement
-- ----------------------------
ALTER TABLE "public"."StockMouvement" ADD CONSTRAINT "chk_type" CHECK (type_mouvement::text = ANY (ARRAY['Entree'::character varying::text, 'Sortie'::character varying::text, 'Ajustement'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table StockMouvement
-- ----------------------------
ALTER TABLE "public"."StockMouvement" ADD CONSTRAINT "StockMouvement_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table categorie
-- ----------------------------
ALTER TABLE "public"."categorie" ADD CONSTRAINT "categorie_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table client
-- ----------------------------
ALTER TABLE "public"."client" ADD CONSTRAINT "client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table commandeFournisseur
-- ----------------------------
ALTER TABLE "public"."commandeFournisseur" ADD CONSTRAINT "chk_status" CHECK (statut::text = ANY (ARRAY['En Attente'::character varying::text, 'Valide'::character varying::text, 'Livre'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table commandeFournisseur
-- ----------------------------
ALTER TABLE "public"."commandeFournisseur" ADD CONSTRAINT "commandeFournisseur_pkey" PRIMARY KEY ("id");

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
SELECT setval('"public"."produit_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table produit
-- ----------------------------
ALTER TABLE "public"."produit" ADD CONSTRAINT "produit_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table utilisateur
-- ----------------------------
ALTER TABLE "public"."utilisateur" ADD CONSTRAINT "chk_role" CHECK (role::text = ANY (ARRAY['Admin'::character varying::text, 'Gestionnaire'::character varying::text, 'Employe'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table utilisateur
-- ----------------------------
ALTER TABLE "public"."utilisateur" ADD CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table utilisateurs
-- ----------------------------
ALTER TABLE "public"."utilisateurs" ADD CONSTRAINT "utilisateurs_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table utilisateurs
-- ----------------------------
ALTER TABLE "public"."utilisateurs" ADD CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table CommandesClient
-- ----------------------------
ALTER TABLE "public"."CommandesClient" ADD CONSTRAINT "client" FOREIGN KEY ("client") REFERENCES "public"."client" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table LigneCommandeClient
-- ----------------------------
ALTER TABLE "public"."LigneCommandeClient" ADD CONSTRAINT "commande" FOREIGN KEY ("commande") REFERENCES "public"."commandeFournisseur" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."LigneCommandeClient" ADD CONSTRAINT "produit" FOREIGN KEY ("produit") REFERENCES "public"."produit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table LigneCommandeFournisseur
-- ----------------------------
ALTER TABLE "public"."LigneCommandeFournisseur" ADD CONSTRAINT "commande" FOREIGN KEY ("commande") REFERENCES "public"."commandeFournisseur" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."LigneCommandeFournisseur" ADD CONSTRAINT "produits" FOREIGN KEY ("produit") REFERENCES "public"."produit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table StockMouvement
-- ----------------------------
ALTER TABLE "public"."StockMouvement" ADD CONSTRAINT "Utils" FOREIGN KEY ("utilisateur") REFERENCES "public"."utilisateur" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."StockMouvement" ADD CONSTRAINT "prod" FOREIGN KEY ("produit") REFERENCES "public"."produit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table commandeFournisseur
-- ----------------------------
ALTER TABLE "public"."commandeFournisseur" ADD CONSTRAINT "fournisseur" FOREIGN KEY ("fournisseur") REFERENCES "public"."fournisseur" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table facture
-- ----------------------------
ALTER TABLE "public"."facture" ADD CONSTRAINT "commande" FOREIGN KEY ("commande_client") REFERENCES "public"."commandeFournisseur" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table paiement
-- ----------------------------
ALTER TABLE "public"."paiement" ADD CONSTRAINT "facture" FOREIGN KEY ("facture") REFERENCES "public"."facture" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table produit
-- ----------------------------
ALTER TABLE "public"."produit" ADD CONSTRAINT "categories" FOREIGN KEY ("categorie") REFERENCES "public"."categorie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
