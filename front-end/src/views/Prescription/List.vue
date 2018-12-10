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

    export default {
        name: "PrescriptionList",
        data() {
            return {
                section: {
                    title: 'Prescriptions',
                    actions: [
                        {to: '/attendance/' + this.$route.params.id + '/prescription/form', label: 'New Prescription'}
                    ],
                    table: {
                        header: ['Date', 'View'],
                        items: [
                            {id: 1, date: '15/10/2018'},
                            {id: 2, date: '08/10/2018'},
                            {id: 3, date: '20/09/2018'},
                            {id: 4, date: '13/06/2018'},
                            {id: 5, date: '01/04/2018'}
                        ]
                    }
                }
            }
        },
        components: {
            Section
        }
    }
</script>
