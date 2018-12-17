<template>
    <Section :title="section.title" :actions="section.actions">
        <div class="content">

            <div class="form">
                <vi-input type="text" v-model="section.form.date" read-only>
                    <template slot="prefix">Date</template>
                </vi-input>
            </div>

            <form @submit.prevent="addMedicine()" class="form">
                <legend class="form__legend"><vi-icon name="stethoscope" /> Add medicine</legend>
                <vi-wrapper tag="fieldset" justify-content="space-between">
                    <div class="form__group">
                        <input class="form__input" placeholder="Medicine" required v-model="section.form.prescription.medicine" type="text" />
                    </div>
                    <div class="form__group">
                        <input class="form__input" placeholder="Dosage" required v-model="section.form.prescription.dosage" type="text" />
                    </div>
                    <div class="form__group">
                        <input class="form__input" placeholder="Via" required v-model="section.form.prescription.via" type="text" />
                    </div>
                    <div class="form__group form__group--button">
                        <vi-button type="submit" success>Add</vi-button>
                    </div>
                </vi-wrapper>
            </form>

            <ul class="medicine__search">
                <li class="medicine__search-item" v-for="medicine in medicines" :key="medicine.IdMedicamento">{{medicine.Nome}}<vi-button @click="chooseMedicine(medicine)" mini>Choose</vi-button></li>
            </ul>

            <div class="table" v-if="section.table.items.length > 0" >
                <vi-table horizontalBordered :columns="section.table.header" :items="section.table.items">
                    <template slot-scope="{ item }">
                        <td>{{item.medicine}}</td>
                        <td>{{item.dosage}}</td>
                        <td>{{item.via}}</td>
                    </template>
                </vi-table>
            </div>

            <div class="button__submit">
                <vi-button @click="savePrescription">Save</vi-button>
            </div>

        </div>
    </Section>
</template>

<script>
    import Section from '../../components/Section';
    import DateHelper from '../../helpers/date';

    export default {
        name: "PrescriptionForm",
        data() {
            return {
                medicineChosen: {},
                section: {
                    title: 'Prescription',
                    actions: [
                        {to: '/attendance/' + this.$route.params['id'], label: 'Back to Prescriptions', icon: 'chevron-prev'}
                    ],
                    form: {
                        date: DateHelper.currentDateFormatted(),
                        prescription: {
                            medicine: '',
                            dosage: '',
                            via: ''
                        }
                    },
                    table: {
                        header: [
                            {id: 'medicine', label: 'Medicine', sortable: false},
                            {id: 'dosage', label: 'Dosage', sortable: false},
                            {id: 'via', label: 'Via Administration', sortable: false}
                        ],
                        items: []
                    }
                }
            }
        },
        computed: {
            medicines() {
                return this.$store.state.medicines.filter(medicine => {
                    return medicine['Nome'].toLowerCase().includes(this.section.form.prescription.medicine.toLowerCase());
                });
            }
        },
        methods: {
            chooseMedicine: function(medicine) {
                this.medicineChosen = medicine;
            },
            savePrescription: function() {

                this.$store.commit('addPrescription', {
                    id: DateHelper.getTime(),
                    date: this.section.form.date,
                    medicines: this.section.table.items
                });

                this.navigateTo(this.getAttendanceRoute());
            },
            addMedicine: function () {
                this.section.table.items.push(this.section.form.prescription);
                this.resetPrescriptionForm();
            },
            resetPrescriptionForm: function () {
                this.section.form.prescription = {
                    medicine: '',
                    dosage: '',
                    via: ''
                };
            },
            getAttendanceRoute: function() {
                return '/attendance/' + this.$route.params['id'];
            },
            navigateTo: function (route) {
                this.$router.push(route);
            }
        },
        components: {
            Section
        }
    }
</script>

<style scoped lang="scss">

    .content {
        padding-top: 20px;
    }

    .form {
        padding: 20px 0 0 0;

        &__legend {
            padding: 10px 0;
        }

        &__group {
            position: relative;
            flex-grow: 2;
        }

        &__input {
            width: 100%;
        }

        &__submit{
            padding-top: 20px;
        }
    }

    .table{
        padding-top: 20px;
    }

    .medicine {

        &__search {
            list-style: none;
            padding: 0;
            margin: 0;
            border: solid 1px #000;
            width: 100%;
            max-height: 150px;
            overflow-y: auto;
            overflow-x: hidden;
            background-color: #FFFFFF;

            &-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                align-content: center;
                padding: 4px;
            }
        }
    }
</style>