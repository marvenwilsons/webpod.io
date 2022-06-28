<template>
    <div class="padleft125 padright125"  >
        <div v-if="fields != undefined" >
            <formBuilder 
                :config="{
                    operation: 'rw'
                }"
                :myData="fields"
            />
        </div>
        <!-- <div class="flex flexend padbottom125" >
            <v-btn color="indigo"  class="white--text margintop125" >
                update
            </v-btn>
        </div> -->
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
        role: undefined,
        fields: undefined
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

        this.fields = {
            'First Name': {
                type: 'string',
                value: firstName,
                hoverInfo: '',
                allowWhiteSpace: true,
                allowSpecialChars: false,
                allowNumericCharacters: false,
                mode: null, 
                maxChar: 40,
                minChar: 5,
                hooks: {
                    onUpdate: (input) => {
                        // goes to server
                        console.log('first name updating', input.value)
                        setTimeout(() => {
                            // console.log(input)
                            input.update.done()
                        }, 100)
                    },
                    onInput: (input) => {
                        // input.error.push('This field is required')
                    }
                }
            },
            'Last Name': {
                type: 'string',
                value: lastName,
                hoverInfo: '',
                allowWhiteSpace: true,
                allowSpecialChars: false,
                allowNumericCharacters: false,
                mode: null, 
                maxChar: 40,
                minChar: 5,
                hooks: {
                    onUpdate: (input) => {
                        // goes to server
                        console.log('first name updating', input.value)
                        setTimeout(() => {
                            console.log(input)
                            // input.update.done('done!')
                        }, 2000)
                    },
                    onInput: (input) => {
                        // input.error.push('This field is required')
                    }
                }
            },
            'Username': {
                type: 'string',
                value: username,
                hoverInfo: '',
                allowWhiteSpace: false,
                allowSpecialChars: false,
                allowNumericCharacters: true,
                mode: null, 
                maxChar: 50,
                minChar: 5
            },
            'Email': {
                type: 'string',
                value: email,
                hoverInfo: '',
                allowWhiteSpace: true,
                allowSpecialChars: true,
                allowNumericCharacters: true,
                mode: null, 
                maxChar: 50,
                minChar: 5
            },
            'Password': {
                type: 'string',
                value: password,
                hoverInfo: '',
                allowWhiteSpace: true,
                allowSpecialChars: false,
                allowNumericCharacters: true,
                mode: 'password', 
                maxChar: 40,
                minChar: 5,
                rules: {
                    includeSpecialCharacters: 2,
                    includeUpperCaseLetters: 3,
                    includeLowerCaseLetters: 3,
                    includeNumericCharacters: 2
                },
                description: [
                    'Must have special characters',
                    'Must have numerical characters',
                    'Must have small & all caps characters'
                ]
            },
            'Role': {
                options: ['Admin','Admin1','Admin2'],
                type: 'select',
                value: 1,
                hoverInfo: '',
                allowWhiteSpace: true,
                allowSpecialChars: false,
                allowNumericCharacters: true,
                mode: null, 
                maxChar: 40,
                minChar: 5
            }
        }
        console.log('role',role)
    }
}
</script>