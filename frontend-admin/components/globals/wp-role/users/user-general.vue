<template>
    <div>
        <div style=" width:400px;" >
            <v-text-field v-model="firstName" outlined label="First Name" autocomplete="off" ></v-text-field>
            <v-text-field v-model="lastName" outlined label="Last Name" autocomplete="off" ></v-text-field>
            <v-text-field v-model="username" outlined label="username" autocomplete="off" ></v-text-field>
            <v-text-field v-model="email" type="text" outlined label="email" onfocus="this.removeAttribute('readonly');" readonly ></v-text-field>
            <v-text-field v-model="password" outlined label="password" type="password" autocomplete="afsdgwerert" ></v-text-field>
            <v-select
            :items="['Admin']"
            v-model="role"
            label="Role"
            outlined
            ></v-select>
        </div>
        <div class="flex flexend padbottom125" >
            <v-btn primary >
                update
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user','roles'],
    data: () => ({
        firstName: undefined,
        lastName: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
        role: undefined
    }),
    mounted() {
        console.log(this.user)
        const { firstName, lastName, username, email, password, role } = this.user
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.email = email
        this.password = password
        this.role = role
    }
}
</script>