<template>
    <Section :title="section.title" :actions="section.actions">
        <table>
            <thead>
            <tr>
                <th v-for="item in section.table.header" v-bind:key="item">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in section.table.items" v-bind:key="item.id">
                <td>{{item.date}}</td>
                <td><router-link v-bind:to="'/attendance/' + $route.params.id + '/prescription/' + item.id + '/view'">View</router-link></td>
            </tr>
            </tbody>
        </table>
    </Section>
</template>

<script>
    import Section from '../../components/Section';
    import AttendanceService from '../../services/attendance';

    export default {
        name: "PrescriptionList",
        data() {
            return {
                attendanceService: new AttendanceService(),
                section: {
                    title: 'Prescriptions',
                    actions: [
                        {to: '/attendance/' + this.$route.params.id + '/prescription/form', label: 'New Prescription'}
                    ],
                    table: {
                        header: ['Date', 'View'],
                        items: []
                    }
                }
            }
        },
        mounted() {
            this.getPrescriptions();
        },
        methods: {
            getPrescriptions() {
                this.section.table.items = this.attendanceService.getPrescriptions();
            },
        },
        components: {
            Section
        }
    }
</script>
