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

    export default {
        name: "PrescriptionView",
        data() {
            return {
                section: {
                    title: 'Prescription ' + this.$route.params.idPrescription,
                    actions: [
                        {to: '/attendance/' + this.$route.params.id, label: 'Back to Prescriptions'}
                    ],
                    table: {
                        header: ['Medicine', 'Dosage', 'Via Administration'],
                        items: [
                            {id: 1, medicine: 'Novalgina', dosage: '2 vezes ao dia', via: 'ORAL'},
                            {id: 2, medicine: 'Neosaldina', dosage: '12 em 12 horas', via: 'ORAL'},
                            {id: 3, medicine: 'Paracetamol', dosage: '4 em 4 horas', via: 'NASAL'},
                            {id: 4, medicine: 'Alegra', dosage: '15 gotas por dia', via: 'ORAL'},
                            {id: 5, medicine: 'Simeticona', dosage: '1 sache por refeição', via: 'NASAL'}
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
