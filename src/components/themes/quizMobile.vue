<template>
	<q-card flat class="card-quiz bg-primary full-width full-height">
		<div>
			<img class="img-title full-width" src="statics/img/quiz-title.png">
		</div>

		<div v-if="success" class="q-px-xs q-py-md scroll" style="height: 350px;">
			<div class="q-mb-sm text-light text-center text-weight-bold">{{polls[0].questions[0].title}}</div>
			<div class="text-center text-white q-mt-sm">
				Responder la encuesta y gánate 5 puntos
			</div>
			<div class="text-center q-mt-lg">
				<q-btn class="bg-white text-primary" size="xs">Entrar</q-btn>
			</div>
		</div>
		<!--
        <div v-if="showVotes" class="votesPoll text-white q-px-md q-py-md">

            <div class="text-h6 font-family-secondary q-my-sm">Resultados</div>
            <div class="contentPoll" v-for="(question, index) in votesPoll" :key="index">

              <div class="question q-mb-md">
                <div class="text-center text-subtitle1">{{question.title}} </div>
                <table class="q-mx-auto">
                  <thead>
                    <tr>
                      <th style="width:50%;"></th>
                      <th class="text-center" style="width:20%;">Votos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="answers" v-for="(answer, index2) in question.answers" :key="index2">
                      <td>{{answer.title}}</td> <td class="text-center">  {{answer.votes}} </td>
                    </tr>
                    <tr>
                     <td>
                       TOTAL
                     </td>
                     <td class="text-center">
                       {{question.totalVotes}}
                     </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

        </div>
        -->

	</q-card>


</template>
<script>
	//Plugins
	import {required} from 'vuelidate/lib/validators'

	import {Chart} from 'highcharts-vue'

	export default {
		name: 'QuizComponent',
		components: {
			Chart
		},
		validations() {
			return {
				selectedOption: {required}
				//selectedOptions: {required}
			}
		},
		beforeMount() {
			this.$nextTick(function () {
				this.init()
			})
		},
		data () {
			return {
				loading: false,
				success: false,
				pollUserIds:[],
				polls:[],
				poll:null,
				answers: [],
				answersOptions: [],
				//selectedOptions: [],
				selectedOption: '',
				finalDataSave:[],
				userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
				alertContent:{
					active: false,
					color:'bg-secondary',
					icon:'check',
					msj:'Gracias por participar!!'
				},
				currentStep: null,
				votesPoll: null,
				showVotes: false,
				btnLoading: false,
				chartsOptions: [],
				chartOptions: {},
				chartOptionsBase: {
					chart: {
						type: 'bar',
						backgroundColor: null,
					},
					title: {
						text: '',
						style: {
							fontFamily: 'Trebuchet MS',
							color: '#ffffff',
							fontSize: '15px'
						}
					},
					xAxis: {
						categories: [], //Answers
						title: {
							text: null,
							style: {
								color: '#fff'
							}
						},
						labels: {
							style: {
								fontSize: '12px',
								color: '#ffffff',
							}
						},
						gridLineWidth: 0,
					},
					yAxis: {
						gridLineWidth: 0,
						min: 0,
						title: {
							text: ''
						},
						labels: {
							overflow: 'justify'
						}
					},
					/*
                    tooltip: {
                        valueSuffix: '%'
                    },
                    */
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true
							},
							borderWidth: 0
						}
					},
					credits: {
						enabled: false
					},
					colors: ['#fff'],
					series: [
						{
							name: "Resultados",
							//pointWidth: 25,
							//pointPadding: 0.01,
							//pointPlacement:'between',
							data: []
						}
					],

				}
			}
		},
		methods: {
			// Init Method
			async init() {
				this.loading = true
				await this.getPolls().catch(error => {})
				this.success = true
				this.loading = false

			},

			// Get Polls with all questions
			// Not Loggin - Limit 1 Poll - random
			// Loggin - Limit 1 Poll - Exclude Polls
			getPolls(){
				return new Promise((resolve, reject) => {

					//filter:
					let fixFilter = {}

					if(this.userId!=null)
						fixFilter =  {allTranslations: true,status: 1,exclude:this.pollUserIds}
					else
						fixFilter = {allTranslations: true,status: 1,random:true,logged:0}

					//Params
					let params = {
						//refresh: true,
						params: {
							include: 'questions',
							filter: fixFilter,
							take: 1
						}
					}

					this.$crud.index("apiRoutes.qquiz.polls",params).then(response => {

						this.polls = response.data

						console.warn(this.polls)
						resolve(true)//Resolve
					}).catch(error => {
						//this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
						console.error('[GET POLLS] ', error);
						reject(false)//Resolve
					})

				})
			},

			// Convert Percentage
			getPercentage(total, obt)
			{
				return Math.round((obt*100)/total);
			}

		}
	}
</script>
<style lang="stylus">
	.chart-quiz
		.highcharts-yaxis-labels
			display none
		.highcharts-axis-title
			color #fff !important
			fill #fff !important
		.highcharts-legend
			display none

	.card-quiz
		border-radius 10px
		.q-radio__outer-circle
			border-radius 4px
		& .image
			background-image url('/statics/img/quiz-fondo.png')
			background-repeat no-repeat
			background-position right bottom
			font-family 'Trebuchet MS'
			& .text-h6
				font-size 18px
				position relative
				&:before
					position absolute
					content "•"
					left -15px
					font-weight bold
			& .q-option-group
				font-size 17px
				color var(--q-color-light)
		& .send
			background-image url('/statics/img/arrow-send-white.png')
			background-repeat no-repeat
			background-position 60% 68%
			background-size 25%
		& .img-title
			margin-top -22px
		& .q-card-main
			padding 10px 25px 15px 25px

		.q-stepper
			background-color $primary
			.q-stepper__header
				display none
			.q-stepper__step-inner
				padding 15px
</style>
