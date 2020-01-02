export class Usuario {

    // el orden si importa , ya que estos serán inicializados en este orden
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {

    }
}