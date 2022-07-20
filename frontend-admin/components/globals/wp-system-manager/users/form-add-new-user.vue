<template>
    <div class="" >
        <div style=" width:400px;" >
            <v-text-field v-model="firstName" outlined label="First Name" autocomplete="off" ></v-text-field>
            <v-text-field v-model="lastName" outlined label="Last Name" autocomplete="off" ></v-text-field>
            <v-text-field v-model="username" outlined label="username" autocomplete="off" ></v-text-field>
            <v-text-field v-model="email" type="text" outlined label="email" onfocus="this.removeAttribute('readonly');" readonly ></v-text-field>
            <v-text-field v-model="password" outlined label="password" type="password" autocomplete="afsdgwerert" ></v-text-field>
            <v-select
            :items="['Admin']"
            label="Role"
            outlined
            ></v-select>
        </div>
        <div class="flex flexend " >
            <v-btn :loading="btnIsLoading" fab @click="sendUserInfoToServer" style="background: linear-gradient(90deg, rgba(112,76,156,1) 0%, rgba(9,9,121,1) 100%); color: white;" >
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import server from './mixins/server'
export default {
    data: () => ({
        firstName: undefined,
        lastName: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
        role: undefined,
        //
        btnIsLoading: false
    }),
    methods: {
        sendUserInfoToServer() {
            this.btnIsLoading = true
            server.user.addNewUser({
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                email: this.email,
                password: this.password,
                role: this.role
            })
        }
    }
}
</script>