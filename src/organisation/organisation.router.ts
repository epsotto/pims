import express from 'express';
import type { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as OrganisationService from './organisation.service';

export const organisationRouter = express.Router();

// Get all organisations
organisationRouter.get('/', async (request: Request, response: Response) => {
  try {
    const organisations = await OrganisationService.getAllOrganisations();
    return response.status(200).json(organisations);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Get a single organisation by ID
organisationRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const organisation = await OrganisationService.getOrganisationById(id);

    if (organisation) {
      return response.status(200).json(organisation);
    }
    return response.status(404).json('Organisation not found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// Create a new organisation
organisationRouter.post(
  '/',
  body('name').isString(),
  body('maxNumberOfEdits').optional().isNumeric(),
  body('maxNumberOfReportsToGenerate').optional().isNumeric(),
  async (request: Request, response: Response) => {
    const error = validationResult(request);

    if (!error.isEmpty()) {
      return response.status(400).json({ errors: error.array() });
    }

    try {
      const organisation = request.body;
      const newOrganisation = await OrganisationService.createOrganisation(organisation);
      return response.status(201).json(newOrganisation);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Update an organisation
organisationRouter.put(
  '/:id',
  param('id').isUUID(),
  body('numberOfEdits').isNumeric(),
  body('reportsGenerated').isNumeric(),
  body('maxNumberOfEdits').optional().isNumeric(),
  body('maxNumberOfReportsToGenerate').optional().isNumeric(),
  async (request: Request, response: Response) => {
    const error = validationResult(request);

    if (!error.isEmpty()) {
      return response.status(400).json({ errors: error.array() });
    }

    try {
      const organisation = request.body;
      const id = request.params.id;
      const updatedOrganisation = await OrganisationService.updateOrganisation(organisation, id);
      return response.status(200).json(updatedOrganisation);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  },
);

// Delete an organisation
organisationRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await OrganisationService.deleteOrganisation(id);
    return response.status(204).send();
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export default organisationRouter;
