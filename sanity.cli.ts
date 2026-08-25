import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  /**
   * Version du studio figée : sans cela Sanity le met à jour tout seul au
   * chargement, ce qui peut casser l'interface d'un client sans prévenir.
   * Les montées de version se font ici, en connaissance de cause.
   */
  autoUpdates: false,
});
