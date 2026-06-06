// backend/modelos/gastronomia/plato.modelo.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Plato',
    tableName: 'platos',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        restaurante_id: {
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
        precio: {
            type: 'decimal',
            precision: 10,
            scale: 2,
        },
        foto: {
            type: 'text',
            nullable: true,
        },
        ingredientes: {
            type: 'text',
            array: true,
            default: '{}',
        },
        categoria: {
            type: 'varchar',
            length: 50,
            nullable: true,
        },
        temporada: {
            type: 'varchar',
            length: 50,
            nullable: true,
        },
        disponible: {
            type: 'boolean',
            default: true,
        },
        es_recomendado: {
            type: 'boolean',
            default: false,
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
        { columns: ['restaurante_id'] },
        { columns: ['categoria'] },
        { columns: ['disponible'] },
    ],
    relations: {
        restaurante: {
            type: 'many-to-one',
            target: 'Restaurante',
            joinColumn: { name: 'restaurante_id' },
        },
    },
});