<template>
    <client-only>
        <v-app id="dq-init-page" class="fullheight-VH relative overflowhidden flex flexcenter smth flexcenter" >
        <div id="bgContainer2" style="width:100%;height:100%;" class="fullwidth  fullheight-percent absolute" ></div>
        <!-- <img id="lleaves" class="absolute" src="ganapathy.jpg" alt=""> -->
        <div style="background:  rgb(26,118,210); background: linear-gradient(180deg, rgba(26,118,210,1) 49%, rgba(4,19,42,1) 100%);" class="absolute fullwidth fullheight-percent" ></div>

        <!-- blur div here -->
        <div id="loginOverlay" class="absolute fullwidth fullheight-percent" >

        </div>

        <!-- form -->
        <div style="z-index:3; overflow: hidden;" :class="['fullheight-VH', 'flex', 'flexcenter smth']" >
            <div class="flex flexcenter" >
                <v-card
                    v-if="ready"
                    id="login-s"
                    style="background:white; max-width:400px; margin-top:-120px;" 
                    class="pad125 margintop125 marginbottom125 flex flexcenter" >
                    <v-progress-linear
                        :active="showProgress"
                        :indeterminate="showProgress"
                        absolute
                        bottom
                        color="primary"
                    ></v-progress-linear>
                    <div class="padleft125 padright125 padbottom125 flex flexcol" >
                        <div class="flex flexcol flexcenter fullwidth" >
                            <!-- logo -->
                            <div v-if="showForms" class="relative flex flexcenter flexstart fullwidth padtop125 padleft025" style="color: lightgray;" >
                                webpod.io
                                <!-- <img class="absolute flex" style="z-index:1;" src="dq-logo.png" alt=""> -->
                            </div>
                        </div>
                        <!-- forms -->
                        <main class="relative flex" style="overflow:hidden;" >  
                            <div
                                :style="{minWidth: showForms ? '0px' : '319px'}"
                                class="smth bordrred"
                            ></div>
                            <!-- email or username -->
                            <signInForm id="webpod-signin" @retrieveAccount="retrieveAccount" ref="signInForm" />
                            <!-- password -->
                            <passwordForm id="webpod-password" @forgotPassword="forgotPassword" @backToSignIn="backToSignIn" ref="passwordForm" />
                        </main>
                        
                        <v-expand-transition>
                            <div v-if="showForms && showBtn" class="flex flexend margintop125" >
                                <v-btn tabindex="0" :loading="currentForm.isLoading" @click="next" color="primary" >
                                    <strong>
                                        {{currentForm.btnText}}
                                    </strong>
                                </v-btn>
                            </div>
                        </v-expand-transition>
                    </div>
                </v-card>
            </div>
        </div>
    </v-app>
    </client-only>
</template>

<script>
// import h from '@/helper'

import signInForm from '@/components/login/sign-in'
import passwordForm from '@/components/login/password'
export default {
    // mixins: [h],
    created() {
        // this.h = this
    },
    components: {
        signInForm,
        passwordForm
    },
    data: () => ({
        password: {
            error: undefined,
            isDone: false,
            isLoading: false,
            btnText: 'sign in',
            placeholder: 'Password',
            title: 'Enter password',
            value: undefined,
            featureText: 'Forgot password?',
            showFeature: false,
            currentPosition: 0,
            showField: true,
            api:undefined
        },
        currentForm: undefined,
        ready: false,
        showForms: false,
        showBtn: true,
        showProgress: true
    }),
    methods: {
        slideToLeft() {
            this.$refs.signInForm.currentPosition = '-319'
            this.$refs.passwordForm.currentPosition = '-319'
        },
        slideToRight() {
            // this.$refs.signInForm.currentPosition  = '0'
            // this.$refs.passwordForm.currentPosition = '319'
        },
        forgotPassword() {

        },
        backToSignIn() {
            /**
             * if it is loading it means the user already submitted the password
             * so you cannot go back to sign-in while its validating the password
             */
            if(this.$refs.passwordForm.isLoading == false) {
                // this.slideToRight()
                this.$refs.signInForm.showForm = true
                this.currentForm = this.$refs.signInForm
                this.currentForm.isLoading = false
                const el = document.getElementById(`webpod-signin`)
                el.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"})
            }
        },
        next() {
            if(this.currentForm.value == undefined) {
                this.currentForm.error = `Invalid ${this.currentForm.placeholder}`
            } else {
                switch(this.currentForm.title) {
                    /**
                     * get if the email or username supplied exist in the database
                     */
                    case 'Sign in': 
                        this.showBtn = false
                        this.showProgress = true

                        // console.log('sign in', `${process.env.api_url}/user/confirm_user`)
                        setTimeout(() => {
                            this.$axios.$get(`${this.api}/user/confirm_user`, {
                                params: { user: this.currentForm.value },
                            })
                            .then(({isSuccess, msg}) => {
                                if(isSuccess) {
                                    // this.slideToLeft()
                                    this.currentForm = this.$refs.passwordForm
                                    this.currentForm.user = this.$refs.signInForm.value
                                    this.currentForm.opacity = 1
                                    this.currentForm.isLoading = false
                                    setTimeout(() => {
                                        const el = document.getElementById(`webpod-password`)
                                        el.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"})
                                        setTimeout(() => {
                                            document.getElementById('password-field').focus()
                                            this.showProgress = false
                                            setTimeout(() => {
                                                this.showBtn = true
                                            },100)
                                        },500)
                                    }, 10);
                                } else {
                                    this.showProgress = false
                                    this.showBtn = true
                                    this.currentForm.error = msg
                                    this.currentForm.isLoading = false
                                }
                            })

                            
                        }, 1000);
                    break

                    /**
                     * payload: first name, last name, email used
                     */
                    case 'Retrive account':
                    break

                    /**
                     * /user/signin
                     * 
                     * When this case hits, it mean the user clicks the
                     * submit button to submit the entered username or email together
                     * with password
                     * 
                     * valdiate in server if credintials submitted is valid, if valid it
                     * returns a token, then redirects to the admin dashboard
                     * 
                     * payload: email or username and password
                     */
                    case 'Input Password':
                        this.showBtn = false
                        this.showProgress = true
                        this.currentForm.disabled = true
                        this.$axios.$post(`${this.api}/user/signin`, {
                            user: this.$refs.signInForm.value,
                            password: this.$refs.passwordForm.value
                        })
                        .then(({isSuccess, content, msg}) => {
                            if(isSuccess) {
                                setTimeout(() => {
                                    localStorage.setItem('token', content.token)
                                    localStorage.setItem('user', content.user)
                                    location.href = '/wpadmin'
                                },500)
                            } else {
                                this.currentForm.disabled = false
                                this.currentForm.error = msg
                                this.currentForm.isLoading = false
                                this.showBtn = true
                                this.showProgress = false
                            }
                        })
                    break

                    /**
                     * 
                     * the admin will define in the dashboard if to give the user an 
                     * ability to change password on request
                     * 
                     * payload: first name, last name, email used
                     */
                    case 'Forgot password':
                    break
                }
                this.currentForm.isLoading = true 
                // fetch database if username or email exist
            }
            

            
        },
        retrieveAccount() {
            console.log('retrive')
        }
    },
    mounted() {
        this.api = `${window.location.origin}/${process.env.api_url}`
        this.ready = true

        /**
         * Set defaults
         */
        setTimeout(() => {
            this.showForms = true
            this.$refs.signInForm.showForm = true
            this.currentForm = this.$refs.signInForm
            this.showProgress = false
        }, 1000);
    }
}
</script>

<style>
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");

#lleaves {
    height: 100%;
}

#loginOverlay:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.13);
    filter: blur(10px);
    
}
#loginOverlay {
    /* background-attachment: fixed; */
    background: inherit;
    background-color: rgba(248, 247, 247, 0.397);  
    backdrop-filter: blur(15px);
    /* z-index: 100; */
    height: 100vh;
}

#login-s, .formShadow {
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
}

</style>