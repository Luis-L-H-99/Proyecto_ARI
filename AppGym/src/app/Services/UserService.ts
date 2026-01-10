import { Injectable } from '@angular/core';
import { UserInterface } from '../../interfaces/UserInterface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // Arreglo global de usuarios
    private usuarios: UserInterface[] = [
        {
            correo: 'prueba1@gmail.com',
            contrasena: '1234',
            nombreUsuario: 'Prueba',
            apellidosUsuario: 'Prueba1',
            edad: 18,
            estaturaCm: 157,
            tipoCuerpo: 'Delgado',
            objetivo: 'Perder Peso',
            frecuenciaAsistencia: 'Ocacional (1 vez/semana)',
            tipoAlimentacion: 'Flexible / Sin plan especifico',
            frecuenciaCardiaca: undefined,
            oxigenacion: undefined,
            trofeos: 0,
            caloriasQuemadas: undefined,
            planActivo: false,
            rutinaActiva: undefined,
            asistencias: undefined,
            planAsociado: undefined,
            metodoPago: undefined,
            fechaCompraPlan: undefined,
            fechaExpiracionPlan: undefined,
        },
        {
            correo: 'prueba2@gmail.com',
            contrasena: '1234',
            nombreUsuario: 'Prueba',
            apellidosUsuario: 'Prueba2',
            edad: 18,
            estaturaCm: 157,
            tipoCuerpo: 'Delgado',
            objetivo: 'Perder Peso',
            frecuenciaAsistencia: 'Ocacional (1 vez/semana)',
            tipoAlimentacion: 'Flexible / Sin plan especifico',
            frecuenciaCardiaca: 123,
            oxigenacion: 86,
            trofeos: 100,
            caloriasQuemadas: 2000,
            planActivo: true,
            rutinaActiva: undefined,
            asistencias: undefined,
            planAsociado: {
                nombrePlan: 'Plan PowerPlus',
                descripcionPlan:
                    'Pensado para personas que ya entrenan de manera regular. Incluye rutinas personalizadas por objetivo, monitoreo avanzado de oxigenación, historial de progreso y ranking por categoría (fuerza, cardio, resistencia).',
                precioPlan: 349,
            },
            metodoPago: {
                nombreTarjeta: 'ejemplo numero 1',
                numeroTarjeta: '8282 8383 8383 8383',
                fechaExpiracion: '01/26',
                cvv: '123',
            },
            fechaCompraPlan: new Date('2024-01-01'),
            fechaExpiracionPlan: new Date('2025-01-01'),
        },
        {
            correo: 'prueba3@gmail.com',
            contrasena: '1234',
            nombreUsuario: 'Prueba',
            apellidosUsuario: 'Prueba3',
            edad: 18,
            estaturaCm: 157,
            tipoCuerpo: 'Delgado',
            objetivo: 'Perder Peso',
            frecuenciaAsistencia: 'Ocacional (1 vez/semana)',
            tipoAlimentacion: 'Flexible / Sin plan especifico',
            frecuenciaCardiaca: 123,
            oxigenacion: 86,
            trofeos: 100,
            caloriasQuemadas: 2000,
            planActivo: true,
            rutinaActiva: {
                nombreLista: 'Quema Grasa',
                listaVideos: [
                    {
                        nombreVideo: 'Video 1',
                        urlVideo: 'urlVideo',
                        videoVisto: false,
                        nombreCoach: 'Angeles',
                    },
                ],
                imagenRutina: 'urlImagen',
            },
            asistencias: [
                {
                    fechaAsistencia: undefined,
                    dia: 1,
                    mes: 0,
                    anio: 2025,
                    tiempoCronometroSegundos: 1000,
                },
            ],
            planAsociado: {
                nombrePlan: 'Plan EliteAthlete',
                descripcionPlan:
                    'La experiencia completa. Acceso a rutinas avanzadas exclusivas, oxigenación en tiempo real, rankings dinámicos, recomendaciones inteligentes según desempeño y sistema de logros gamificado.',
                precioPlan: 499,
            },
            metodoPago: {
                nombreTarjeta: 'ejemplo numero 1',
                numeroTarjeta: '8282 8383 8383 8383',
                fechaExpiracion: '01/26',
                cvv: '123',
            },
            fechaCompraPlan: new Date('2025-01-01'),
            fechaExpiracionPlan: new Date('2027-01-01'),
        },
    ];
    // Usuario logueado (usuario actual)
    usuarioActual: UserInterface | null = null;
    // Obtener todos los usuarios
    obtenerUsuarios(): UserInterface[] {
        return this.usuarios;
    }
    // Limpiar usuario actual
    limpiarUsuarioActual(): void {
        this.usuarioActual = null;
    }
    // Buscar usuario para iniciar sesión
    buscarUsuario(
        correo: string,
        contrasena: string
    ): UserInterface | undefined {
        return this.usuarios.find(
            usuario =>
                usuario.correo === correo &&
                usuario.contrasena === contrasena
        );
    }
    // Agregar un nuevo usuario
    agregarUsuario(usuario: UserInterface): void {
        this.usuarios.push(usuario);
    }
    // Guardar usuario actual
    guardarUsuarioActual(usuario: UserInterface): void {
        this.usuarioActual = usuario;
    }
    // Actualizar usuario existente
    actualizarUsuario(usuarioActualizado: UserInterface): void {
        const index = this.usuarios.findIndex(
            u => u.correo === usuarioActualizado.correo
        );

        if (index !== -1) {
            this.usuarios[index] = usuarioActualizado;
        }
    }
}
