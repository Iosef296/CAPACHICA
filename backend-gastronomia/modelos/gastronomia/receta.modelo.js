// backend/modelos/gastronomia/receta.modelo.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Receta',
    tableName: 'recetas',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        plato_id: {
            type: 'uuid',
            nullable: false,
        },
        titulo: {
            type: 'varchar',
            length: 200,
        },
        descripcion: {
            type: 'text',
            nullable: true,
        },
        ingredientes_detallados: {
            type: 'text',
            array: true,
            default: '{}',
        },
        pasos: {
            type: 'text',
            array: true,
            default: '{}',
        },
        tiempo_preparacion: {
            type: 'varchar',
            length: 50,
            nullable: true,
        },
        dificultad: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        pdf_url: {
            type: 'text',
            nullable: true,
        },
        video_url: {
            type: 'text',
            nullable: true,
        },
        foto: {
            type: 'text',
            nullable: true,
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
        { columns: ['plato_id'] },
    ],
    relations: {
        plato: {
            type: 'many-to-one',
            target: 'Plato',
            joinColumn: { name: 'plato_id' },
        },
    },
});