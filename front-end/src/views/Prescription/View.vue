<template>
    <Section :title="section.title" :actions="section.actions">
        <table>
            <thead>
            <tr>
                <th v-for="item in section.table.header" v-bind:key="item">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in section.table.items" v-bind:key="item.medicine">
                <td>{{item.medicine}}</td>
                <td>{{item.dosage}}</td>
                <td>{{item.via}}</td>
            </tr>
            </tbody>
        </table>
    </Section>
</template>

<script>
    import Section from '../../components/Section';
    import AttendanceService from '../../services/attendance';

    export default {
        name: "PrescriptionView",
        data() {
            return {
                attendanceService: new AttendanceService(),
                section: {
                    title: 'Prescription ' + this.$route.params.idPrescription,
                    actions: [
                        {to: '/attendance/' + this.$route.params.id, label: 'Back to Prescriptions'}
                    ],
                    table: {
                        header: ['Medicine', 'Dosage', 'Via Administration'],
                        items: []
                    }
                }
            }
        },
        mounted() {
            this.getPrescription(this.$route.params.idPrescription);
        },
        methods: {
            getPrescription(id) {
                const prescription = this.attendanceService.getPrescription(id);
                this.section.table.items = prescription[0].medicines;
            },
        },
        components: {
            Section
        }
    }
</script>
