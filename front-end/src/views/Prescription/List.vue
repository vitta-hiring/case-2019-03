<template>
    <Section :title="section.title" :actions="section.actions">
        <div class="content" v-if="prescriptions.length > 0">
            <vi-table horizontalBordered :columns="section.table.header" :items="prescriptions">
                <template slot-scope="{ item }">
                    <td>{{item.date}}</td>
                    <td style="text-align: center">
                        <router-link :to="'/attendance/' + $route.params['id'] + '/prescription/' + item.id + '/view'">
                            <vi-icon name="document"/>
                        </router-link>
                    </td>
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
                section: {
                    title: 'Prescriptions',
                    actions: [
                        {to: '/attendance/' + this.$route.params['id'] + '/prescription/form', label: 'New', icon: 'plus'}
                    ],
                    table: {
                        header: [
                            {id: 'date', label: 'Date', sortable: true},
                            {id: 'view', label: '', sortable: false}
                        ]
                    }
                }
            }
        },
        computed: {
            prescriptions() {
                return this.$store.state.prescriptions;
            }
        },
        components: {
            Section
        }
    }
</script>

<style>
    .content {
        padding-top: 20px;
    }
</style>