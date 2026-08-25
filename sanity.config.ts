import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema, singletonTypes } from "./src/sanity/schema";

/**
 * Chaque rubrique est un document unique : pas de bouton « créer », pas de
 * liste à parcourir. Léa clique sur une rubrique, elle édite, elle publie.
 */
const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du site")
    .items(
      singletonTypes.map((item) =>
        S.listItem()
          .title(item.title)
          .id(item.type)
          .child(
            S.document().schemaType(item.type).documentId(item.type).title(item.title),
          ),
      ),
    );

export default defineConfig({
  name: "kastell",
  title: "Kastell Conseil",
  projectId,
  dataset,
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Un singleton ne se duplique pas et ne se supprime pas.
    actions: (prev) =>
      prev.filter(({ action }) =>
        ["publish", "discardChanges", "restore"].includes(action ?? ""),
      ),
  },
});
