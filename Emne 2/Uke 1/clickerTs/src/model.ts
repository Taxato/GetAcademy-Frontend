// type Model = {
//     points: number;
//     pointsPerClick: number;
//     smileyIndex: number;
// };

interface Model {
    points: number;
    pointsPerClick: number;
    smileyIndex: number;
}

// interface ModelWithTerje extends Model {
//     terje: string;
// }

const model : Model = {
    points: 0,
    pointsPerClick: 1,
    smileyIndex: 0,
};

// const modelWithTerje : ModelWithTerje = {
//     points: 0,
//     pointsPerClick: 1,
//     smileyIndex: 0,
//     terje: 'terje'
// };

export { model };
export type { Model };