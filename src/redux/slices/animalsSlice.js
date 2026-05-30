import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAnimalsFromAPI, postAnimalToAPI, deleteAnimalFromAPI, updateAnimalInAPI } from '../../services/animalsService'

// Async thunks
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAnimalsFromAPI()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const createAnimal = createAsyncThunk(
  'animals/create',
  async (animalData, { rejectWithValue }) => {
    try {
      return await postAnimalToAPI(animalData)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteAnimal = createAsyncThunk(
  'animals/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAnimalFromAPI(id)
      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const updateAnimal = createAsyncThunk(
  'animals/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateAnimalInAPI(id, data)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    list: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    searchQuery: '',
    filterZone: 'all',
    filterClass: 'all',
    selectedAnimal: null,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setFilterZone(state, action) {
      state.filterZone = action.payload
    },
    setFilterClass(state, action) {
      state.filterClass = action.payload
    },
    setSelectedAnimal(state, action) {
      state.selectedAnimal = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAnimals
      .addCase(fetchAnimals.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // createAnimal
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(createAnimal.rejected, (state, action) => {
        state.error = action.payload
      })
      // deleteAnimal
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.list = state.list.filter(a => a.id !== action.payload)
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.error = action.payload
      })
      // updateAnimal
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const idx = state.list.findIndex(a => a.id === action.payload.id)
        if (idx !== -1) state.list[idx] = action.payload
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const {
  setSearchQuery, setFilterZone, setFilterClass,
  setSelectedAnimal, clearError
} = animalsSlice.actions

// Selectors
export const selectFilteredAnimals = (state) => {
  const { list, searchQuery, filterZone, filterClass } = state.animals
  return list.filter(animal => {
    const matchSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.latinName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchZone = filterZone === 'all' || animal.zone === filterZone
    const matchClass = filterClass === 'all' || animal.class === filterClass
    return matchSearch && matchZone && matchClass
  })
}

export default animalsSlice.reducer
