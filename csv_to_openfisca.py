# -*- coding: utf-8 -*-

import pandas as pds
import numpy as np

# from openfisca_core.simulations import Simulation
from openfisca_core.simulation_builder import SimulationBuilder, Simulation
from openfisca_country_template import CountryTaxBenefitSystem

tax_benefit_system = CountryTaxBenefitSystem()

def set_members_entity_id(entity, entity_id_array):
  assert entity.ids is not None  # We needs the ids to be set to make sure we match households.
  ids, inverse = entity.members_entity_id = np.unique(entity_id_array, return_inverse = True)
  assert (ids == np.unique(entity.ids)).all()  # otherwise, input are inconsistent
  entity.members_entity_id = np.argsort(entity.ids)[inverse]


def set_members_role(entity, role_array):
  # We should check that there is not an unexpected role here.
  entity.members_role = np.select([role_array == role.key for role in entity.flattened_roles], entity.flattened_roles)


period = '2017-01'

data_persons = pds.read_csv('./data_persons.csv')
data_households = pds.read_csv('./data_households.csv')

simulation = Simulation(tax_benefit_system)

simulation.person.ids = data_persons.person_id
simulation.person.count = len(data_persons)
simulation.household.ids = data_households.household_id
simulation.household.count = len(data_households)

set_members_entity_id(simulation.household, data_persons.household_id)
set_members_role(simulation.household, data_persons.role_in_household)


simulation.set_input('salary', period, np.array(data_persons.salary))
simulation.set_input('age', period, np.array(data_persons.age))
simulation.set_input('rent', period, np.array(data_households.rent))
simulation.set_input('accommodation_size', period, np.array(data_households.accommodation_size))

total_taxes = simulation.calculate('total_taxes', period)  # ou total_benefits ?
