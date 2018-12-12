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
                    <vi-input placeholder="Medicine" required v-model="section.form.prescription.medicine" type="text" />
                    <vi-input placeholder="Dosage" required v-model="section.form.prescription.dosage" type="text" />
                    <vi-input placeholder="Via" required v-model="section.form.prescription.via" type="text" />
                    <vi-button type="submit" success>Add</vi-button>
                </vi-wrapper>
            </form>

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
                        },
                        customErrorMsg: {
                            typeMismatch: 'Isso não é um email',
                            valueMissing: 'Preencha o email',
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
        methods: {
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

<style scoped>
    .content {
        padding-top: 20px;
    }
    .form {
        padding: 20px 0 0 0;
    }
    .form__legend {
        padding: 10px 0;
    }
    .table{
        padding-top: 20px;
    }
    .button__submit{
        padding-top: 20px;
    }
</style>