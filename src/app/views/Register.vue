<template>
 <div >
   <v-container>
      <v-card>
          <v-card-title class="headline">Registro Información personal</v-card-title>
          <v-card-subtitle>Ingrese los siguientes datos para proceder con el pago </v-card-subtitle>
          <v-card-text>
              <v-col cols="12">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
              <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="firtsName"
                        label="Nombres"
                        :rules="nameRules"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="lastName"
                        label="Apellidos"
                        :rules="nameRules"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>

                
              <v-row>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Correo Electrónico"
                    required
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                  <v-select
                    v-model="gender"
                    label="Género" 
                    :items="genderList"
                    item-text="genderText"
                    item-value="genderId"
                    :menu-props="{ maxHeight: '400' }"
                    :rules="[(v) => !!v || 'Seleccione un género']"
                    >                    
                </v-select>
              </v-col>
            </v-row>
            <v-row>    
              <v-col>
                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Acepto las Condiciones y Política de datos"
                  required
                >
                </v-checkbox>
                <a href="#"> Condiciones</a> | 
                <a href="#"> Política de datos</a>
              </v-col>
            </v-row>
                <v-btn
                  :disabled="!valid"
                  color="error"
                  class="mr-4"
                  @click="validate"
                >
                  Continuar
                </v-btn>

              
              </v-form>
              </v-col>
          </v-card-text>
      </v-card>
          </v-container>

</div>

</template>


<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      firtsName: '',
      lastName: '',
      nameRules: [
        v => !!v || 'Este campo es requerido',
        v => (v && v.length <= 50) || 'Este campo acepta máximo 50 caracteres',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Correo elctrónico es requerido',
        v => /.+@.+\..+/.test(v) || 'Correo electrónico inválido',
      ],
      select: null,
      gender: '',
      genderList:[
                {genderId:"f",genderText:"Femenino"},
                {genderId:"m",genderText:"Masculino"}            
            ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>