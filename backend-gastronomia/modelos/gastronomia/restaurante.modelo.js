// backend/modelos/gastronomia/restaurante.modelo.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Restaurante',
    tableName: 'restaurantes',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        usuario_id: {
            type: 'uuid',
            nullable: false,
        },
        nombre: {
            type: 'varchar',
            length: 200,
        },
        descripcion: {
            type: 'text',
            nullable: true,
        },
        ubicacion: {
            type: 'geometry',
            spatialFeatureType: 'Point',
            srid: 4326,
            nullable: false,
        },
        direccion: {
            type: 'text',
        },
        whatsapp: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        telefono: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        email_contacto: {
            type: 'varchar',
            length: 150,
            nullable: true,
        },
        redes_sociales: {
            type: 'jsonb',
            default: '{}',
        },
        horarios: {
            type: 'jsonb',
            default: '{}',
        },
        fotos: {
            type: 'text',
            array: true,
            default: '{}',
        },
        tipo_comida: {
            type: 'varchar',
            length: 50,
            nullable: true,
        },
        especialidades: {
            type: 'text',
            array: true,
            default: '{}',
        },
        precio_promedio: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: true,
        },
        capacidad_mesas: {
            type: 'integer',
            nullable: true,
        },
        acepta_reservas: {
            type: 'boolean',
            default: true,
        },
        aprobado: {
            type: 'boolean',
            default: false,
        },
        activo: {
            type: 'boolean',
            default: true,
        },
        created_at: {
            type: 'timestamp',
            createDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
        updated_at: {
            type: 'timestamp',
            updateDate: true,
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    indices: [
        { columns: ['usuario_id'] },
        { columns: ['aprobado'] },
        { columns: ['tipo_comida'] },
    ],
    relations: {
        usuario: {
            type: 'many-to-one',
            target: 'Usuario',
            joinColumn: { name: 'usuario_id' },
        },
    },
});