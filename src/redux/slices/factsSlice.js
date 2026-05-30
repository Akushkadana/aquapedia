import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOceanFacts } from '../../services/factsService'

export const loadFacts = createAsyncThunk(
  'facts/load',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOceanFacts()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const factsSlice = createSlice({
  name: 'facts',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    currentIndex: 0,
  },
  reducers: {
    nextFact(state) {
      state.currentIndex = (state.currentIndex + 1) % state.list.length
    },
    prevFact(state) {
      state.currentIndex = (state.currentIndex - 1 + state.list.length) % state.list.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFacts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadFacts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(loadFacts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { nextFact, prevFact } = factsSlice.actions
export default factsSlice.reducer
