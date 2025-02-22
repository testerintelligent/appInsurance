import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Tooltip,
  Menu,
  TablePagination,
} from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { FilterList, Delete, Sort, Warning } from "@mui/icons-material"
import { styled, alpha } from "@mui/material/styles"

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  margin: "20px",
  overflow: "hidden",
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(145deg, #6366f1 0%, #4f46e5 100%)",
  "& th": {
    color: "white !important",
    fontWeight: "bold",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: alpha("#4338ca", 0.2),
    },
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    background: alpha("#6366f1", 0.05),
    transform: "scale(1.002)",
  },
}))

const DeleteButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(145deg, #ef4444 0%, #dc2626 100%)",
  color: "white",
  "&:hover": {
    background: "linear-gradient(145deg, #dc2626 0%, #b91c1c 100%)",
  },
}))

const Dashboard = () => {
  const [insuranceData, setInsuranceData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [policyToDelete, setPolicyToDelete] = useState(null)
  const [filters, setFilters] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [activeColumn, setActiveColumn] = useState(null)
  const [page, setPage] = useState(0) // For pagination: current page
  const [rowsPerPage, setRowsPerPage] = useState(5) // Number of rows per page
  const navigate = useNavigate()

  useEffect(() => {
    const sessionKey = sessionStorage.getItem("sessionKey")
    if (!sessionKey) {
      navigate("/insurance")
    }
  }, [navigate])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.192.190.148:5000/Dashboard")
      setInsuranceData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })

    const sortedData = [...insuranceData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1
      return 0
    })

    setInsuranceData(sortedData)
  }

  const handleFilter = (column, value) => {
    const newFilters = { ...filters, [column]: value }
    if (!value) delete newFilters[column]
    setFilters(newFilters)
  }

  const filteredData = insuranceData.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      return String(item[key]).toLowerCase().includes(value.toLowerCase())
    })
  })

  // Pagination handling: slice data to fit current page
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const openFilterMenu = (event, column) => {
    setFilterAnchorEl(event.currentTarget)
    setActiveColumn(column)
  }

  const closeFilterMenu = () => {
    setFilterAnchorEl(null)
    setActiveColumn(null)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Invalid Date"
    return new Intl.DateTimeFormat("en-GB").format(date)
  }

  const generateRandomNumber = () => Math.floor(100000 + Math.random() * 900000)

  const handleDelete = async () => {
    try {
      await axios.delete(`http://10.192.190.148:5000/Dashboard/${policyToDelete}`)
      setInsuranceData((prev) => prev.filter((insurance) => insurance._id !== policyToDelete))
      setShowModal(false)
    } catch (error) {
      console.error("Error deleting policy:", error)
    }
  }

  const tableHeaders = [
    { id: "CurrentDate", label: "Policy Create Date" },
    { id: "policyNumber", label: "Policy Number" },
    { id: "Name", label: "Full Name" },
    { id: "email", label: "Email ID" },
    { id: "Address", label: "Address" },
    { id: "DateOfBirth", label: "Date of Birth" },
    { id: "Gender", label: "Gender" },
    { id: "PolicyType", label: "Policy Type" },
    { id: "SumInsured", label: "Sum Insured" },
    { id: "Premium", label: "Premium" },
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header.id}>
                  <div className="flex items-center gap-2">
                    <span onClick={() => handleSort(header.id)}>{header.label}</span>
                    <div className="flex">
                      <Tooltip title="Sort">
                        <IconButton size="small" onClick={() => handleSort(header.id)}>
                          <Sort fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Filter">
                        <IconButton size="small" onClick={(e) => openFilterMenu(e, header.id)}>
                          <FilterList fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            <AnimatePresence>
              {paginatedData.map((insurance, index) => (
                <motion.tr
                  key={insurance._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  component={StyledTableRow}
                >
                  <TableCell>{formatDate(insurance.CurrentDate)}</TableCell>
                  <TableCell>{insurance.policyNumber || generateRandomNumber()}</TableCell>
                  <TableCell>{insurance.Name}</TableCell>
                  <TableCell>{insurance.email}</TableCell>
                  <TableCell>{insurance.Address}</TableCell>
                  <TableCell>{formatDate(insurance.DateOfBirth)}</TableCell>
                  <TableCell>{insurance.Gender}</TableCell>
                  <TableCell>
                    {Array.isArray(insurance.PolicyType) ? insurance.PolicyType.join(", ") : insurance.PolicyType}
                  </TableCell>
                  <TableCell>{insurance.SumInsured}</TableCell>
                  <TableCell>{insurance.Premium}</TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <DeleteButton
                        variant="contained"
                        startIcon={<Delete />}
                        onClick={() => {
                          setPolicyToDelete(insurance._id)
                          setShowModal(true)
                        }}
                      >
                        Delete
                      </DeleteButton>
                    </motion.div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={closeFilterMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            padding: "16px",
            minWidth: "200px",
            borderRadius: "12px",
          },
        }}
      >
        <TextField
          autoFocus
          placeholder="Filter..."
          value={filters[activeColumn] || ""}
          onChange={(e) => handleFilter(activeColumn, e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Menu>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        PaperProps={{
          style: {
            borderRadius: "16px",
            padding: "16px",
          },
        }}
      >
        <DialogTitle>
          <div className="flex items-center gap-2">
            <Warning color="error" />
            Delete Policy
          </div>
        </DialogTitle>
        <DialogContent>
          <p className="text-gray-600">
            Are you sure you want to delete this insurance policy? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => setShowModal(false)} color="primary">
              Cancel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <DeleteButton onClick={handleDelete} variant="contained">
              Delete
            </DeleteButton>
          </motion.div>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

export default Dashboard
