<template>
    <q-card flat :class="className" class="relative-position">
        <div>
            <img class="img-title full-width" v-show="!isModal" src="statics/img/trivia-title.png">
        </div>
        <div class="content-stepper">

            <q-stepper v-if="success && answers.length>0 && !alertContent.active && !showResults" ref="stepper"
                       v-model="currentStep" class="no-shadow">
                <!-- Step: -->
                <q-step :name="question.id" :order="index" :title="question.title"
                        v-for="(question, index) in trivia.questions" :key="index">

                    <q-card-section>
                        <div class="text-h6 text-center text-primary">{{question.title}}</div>
                        <div class="text-center q-mt-sm">
                            Responder la encuesta y gánate 5 puntos
                        </div>
                        <div class="text-center q-mt-sm">
                            <q-btn class="bg-primary text-white" size="xs">Entrar</q-btn>
                        </div>
                    </q-card-section>

                </q-step>


            </q-stepper>

            <q-inner-loading class="absolute-center" :visible="loading"/>
        </div>

        <!-- msj final -->
        <q-banner v-if="alertContent.active" class="q-mx-sm q-mt-md q-py-md text-black bg-transparent">

            <template v-slot:avatar>
                <q-icon :name="alertContent.icon" color="primary"/>
            </template>

          <div class="text-center q-mt-sm">
            Responder la encuesta y gánate 5 puntos
          </div>
          <div class="text-center q-mt-sm">
            <q-btn class="bg-primary text-white" size="xs">Entrar</q-btn>
          </div>
        </q-banner>

    </q-card>
</template>
<script>
    //Plugins
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: 'trivia-mobile',
        props: ['isModal', 'className', 'trivia', 'loading2'],
        validations() {
            return {
                selectedOption: {required}
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.init()
            })
        },
        data() {
            return {
                loading: false,
                success: false,
                answers: [],
                answersOptions: [],
                selectedOption: '',
                finalDataSave: [],
                userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
                alertContent: {
                    active: false,
                    color: 'bg-primary',
                    icon: 'check',
                    msj: 'Gracias por participar!!'
                },
                currentStep: null,
                showResults: false,
                resultsTrivia: [],
                btnLoading: false,
            }
        },
        methods: {

            // Init Method
            async init() {

                this.loading = true

                if (this.userId != null) {
                    if (this.trivia != null) {
                        // Get answers for each question
                        for (let i = 0; i < this.trivia.questions.length; i++) {
                            let qId = this.trivia.questions[i].id
                            await this.getAnswers(qId, i).catch(error => {
                            })
                            this.answers[i] = this.answersOptions
                            this.answersOptions = []

                            // Set questionID to step
                            if (i == 0) this.currentStep = qId
                        }

                    } else {
                        this.alertContent.msj = "No existen trivias disponibles"
                        this.alertContent.icon = "info"
                        this.alertContent.active = true
                    }
                } else {
                    this.alertContent.msj = "Debes iniciar sesion"
                    this.alertContent.icon = "account_circle"
                    this.alertContent.active = true
                }

                this.success = true
                this.loading = false

                if (this.isModal)
                    this.$emit('loading2', false);

            },
            // Get Answers for question
            getAnswers(questionId, pos) {
                return new Promise((resolve, reject) => {
                    //Params
                    let params = {
                        //refresh: true,
                        params: {
                            include: 'answers',
                            filter: {allTranslations: true},
                        }
                    }

                    this.$crud.show("apiRoutes.qtrivia.questions", questionId, params).then(response => {

                        response.data.answers.forEach((answer, index) => {
                            this.answersOptions.push({
                                label: answer.title,
                                value: answer.id
                            })
                        });
                        resolve(true)//Resolve

                    }).catch(error => {
                        console.warn('[ERROR - TRIVIA - GET ANSWERS] ')
                        // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                        reject(false)//Resolve
                    })


                })
            },
            // Save Data Answers
            async saveData() {
                this.$v.$touch()
                if (!this.$v.$error) {

                    this.loading = true;
                    this.btnLoading = true

                    await this.setDataFinal()

                    // User Questions Answers
                    await this.saveUserQuestionsAnswers()

                    // Finished Trivia
                    await this.saveUserTrivia()

                    this.$v.$reset()//Reset validations
                    this.alertContent.active = true
                    this.loading = false;
                    this.btnLoading = false

                } else {
                    this.$alert.error({message: 'Trivia: Debe seleccionar una respuesta', pos: 'bottom'})
                }

            },
            // Next question
            next() {
                this.$v.$touch()
                if (!this.$v.$error) {
                    this.setDataFinal()
                    this.$refs.stepper.next()
                } else {
                    this.$alert.error({message: 'Trivia: Debe seleccionar una respuesta', pos: 'bottom'})
                }
            },
            // set data to Save
            setDataFinal() {
                this.finalDataSave.push({
                    question_id: this.currentStep,
                    answer_id: this.selectedOption,
                    user_id: this.userId
                })
                this.selectedOption = ''
            },
            //Save Data User Trivia Finished
            saveUserTrivia() {

                let data = {
                    'trivia_id': this.trivia.id,
                    'user_id': this.userId
                }
                this.$crud.create('apiRoutes.qtrivia.userTrivias', data).then(response => {

                    this.resultsTrivia = response.data[0]
                    console.warn('[TRIVIA - CREATE USER TRIVIAS]')
                    this.showResults = true
                    this.loading = false
                }).catch(error => {
                    console.error('[TRIVIA - CREATE USER TRIVIAS] ', error)
                    //this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
                })

            },
            // Save Data Questions and Answers
            saveUserQuestionsAnswers() {
                this.finalDataSave.forEach((data, index) => {
                    this.$crud.create('apiRoutes.qtrivia.userQuestionAnswers', data).then(response => {
                        console.warn("TRIVIA - SAVE USER QUESTION ANSWER")
                    }).catch(error => {
                        console.error('[TRIVIA - CREATE USER QUESTION ANSWERS] ', error)
                        //this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
                        this.loading = false
                    })

                })// End Save Answers
            }
        }
    }
</script>
<style lang="stylus">
    .triviaModal
        & .q-card__section
            padding 0

            .text-h6
                font-size 18px
                text-align center
                margin-top 0

        & .q-option-group
            > div
                border 1px solid #FD2D5E
                border-radius 20px
                margin-bottom 10px
                padding 8px

                & .q-icon
                    color #FD2D5E
                    font-size 20px

        .q-stepper
            .q-stepper__header
                display none

            .q-stepper__step-inner
                padding 15px

    .home-trivia
        border-radius 10px
        width 100%
        height 100%
        background-color var(--q-color-light)

        & .send
            background-image url('/statics/img/arrow-send-yellow.png')
            background-repeat no-repeat
            background-position 73% 74%
            background-size: 25%

        & .img-title
            margin-top -22px

        & .q-card__section
            padding-left 0
            padding-right 0
            padding-top 0

            & .text-h6
                position relative
                margin-bottom 0
                margin-left 25px
                margin-right 25px
                font-size 18px
                line-height 1.5rem

                &:before
                    position absolute
                    color #FD2D5E
                    content "•"
                    left -15px
                    font-weight bold

        & .q-option-group
            > div
                border 1px solid #FD2D5E
                border-radius 20px
                margin-bottom 10px

                .q-radio__bg
                    background-color #fff
                    border-radius 50%

                & .q-icon
                    color #FD2D5E
                    font-size 20px

                & .q-radio__label
                    font-size 18px

        .q-stepper
            background-color var(--q-color-light)
            border-radius 10px

            .q-stepper__header
                display none

            .q-stepper__step-inner
                padding 15px

        .content-stepper
            .q-inner-loading
                background none
</style>
