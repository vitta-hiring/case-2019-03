import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { routes as homeRoutes } from '../features/home/routes'

import { routes as listDoctors } from '../features/doctor/list.routes'
import { routes as createDoctor } from '../features/doctor/pages/create.routes'

import { routes as listMedicines } from '../features/medicine/list.routes'
import { routes as createMedicine } from '../features/medicine/pages/create.routes'

import { routes as listPatients } from '../features/patient/list.routes'
import { routes as createPatient } from '../features/patient/pages/create.routes'

import { routes as listPrescriptions } from '../features/prescriptions/list.routes'
import { routes as createPrescription } from '../features/prescriptions/pages/create.routes'

const Routes = () => {
    return (
        <Suspense fallback>
            <Switch>
                <Route exact {...homeRoutes} />
                <Route {...listDoctors} />
                <Route {...createDoctor} />
                <Route {...listMedicines} />
                <Route {...createMedicine} />
                <Route {...listPatients} />
                <Route {...createPatient} />
                <Route {...listPrescriptions} />
                <Route {...createPrescription} />
            </Switch>
        </Suspense>
    )
}

export default Routes
