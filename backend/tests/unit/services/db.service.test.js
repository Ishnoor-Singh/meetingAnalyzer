let {addReport} = require('../../../src/services/db.service')

let {Report} = require('../../../src/models/report.model')

// jest.mock('../../../src/models/report.model', () => {
//     return {
//         Report: jest.fn().mockReturnValue({
//             save: jest.fn().mockResolvedValue({
//                 _id: 5
//             })
//         })
//     }
// })
// const s = jest.fn()
// expect(s).tohaveBeenCalledTimes(1)
jest.mock('../../../src/models/report.model')
// Report.mockReturnValue({
//     save: jest.fn().mockResolvedValue({
//         _id: 5
//     })
// })
describe("when addReport iscalled", () =>  {
    beforeEach(() => {
        addReport(params)
    })
    afterEach(() => {
        Report.mockClear()
    })
    it("shpould call constructoir with the right name", () => {
        expect(Report.mocks[0]).tohaveBeenCalledWith({name: params})
    })
    it("should call sace", () => {
        expect(Report.mocks[0].save).tohaveBeenCalledTimes(1)
    })
})