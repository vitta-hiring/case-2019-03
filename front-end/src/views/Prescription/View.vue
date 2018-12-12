<template>
    <Section :title="getSectionTitle()" :actions="section.actions">

        <div class="form">
            <vi-input type="text" v-model="prescription.date" read-only>
                <template slot="prefix">Date</template>
            </vi-input>
        </div>

        <div class="table" v-if="prescription.medicines.length > 0">
            <vi-table striped horizontalBordered :columns="section.table.header" :items="prescription.medicines">
                <template slot-scope="{ item }">
                    <td>{{item.medicine}}</td>
                    <td>{{item.dosage}}</td>
                    <td>{{item.via}}</td>
                </template>
            </vi-table>
        </div>

    </Section>
</template>

<script>
    import Section from '../../components/Section';

    export default {
        data() {
            return {
                id: this.$route.params['id'],
                idPrescription: this.$route.params['idPrescription'],
                section: {
                    actions: [
                        {to: '/attendance/' + this.$route.params['id'], label: 'Back to Prescriptions', icon: 'chevron-prev'}
                    ],
                    table: {
                        header: [
                            {id: 'medicine', label: 'Medicine', sortable: false},
                            {id: 'dosage', label: 'Dosage', sortable: false},
                            {id: 'via', label: 'Via Administration', sortable: false}
                        ]
                    }
                }
            }
        },
        methods: {
            getSectionTitle() {
                return 'Prescription ' + this.$route.params['idPrescription'];
            }
        },
        computed: {
            prescription() {
                const idPrescription = parseInt(this.$route.params['idPrescription'], 10);
                return this.$store.getters.getPrescriptionById(idPrescription);
            }
        },
        components: {
            Section
        }
    }
</script>

<style scoped>
    .form {
        padding-top: 20px;
    }
    .table{
        padding-top: 20px;
    }
</style>
