/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addPackageJsonDependenciesForLibrary,
  analyzeApplication,
  analyzeCrossFeatureDependencies,
  finalizeInstallation,
  LibraryOptions as SpartacusRequestedDeliveryDateOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addRequestedDeliveryDateFeature(
  options: SpartacusRequestedDeliveryDateOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(
      options.features as string[]
    );

    return chain([
      analyzeApplication(options, features),

      addFeatures(options, features),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      finalizeInstallation(options, features),
    ]);
  };
}