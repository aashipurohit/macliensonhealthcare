import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";  
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByFilters,
  setFilters,
  clearFilters
} from '../redux/slices/productsSlice';
import { Link } from 'react-router-dom';
import {
  Box, Grid, Card, CardContent, CardMedia, Typography, Button,
  CircularProgress, Alert, FormControl, FormLabel, FormGroup,
  FormControlLabel, Checkbox, RadioGroup, Radio, Container,
  Paper, useMediaQuery, TextField, InputAdornment, Slider,
  Chip, Select, MenuItem, InputLabel, Drawer, IconButton,
  Stack, Divider, Badge
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { formatINR } from "../utils/formatCurrency";

const MIN_PRICE = 0;
const MAX_PRICE = 1000;
const PRICE_STEP = 10;

// --- Premium Theme Colors ---
const THEME = {
  royal: '#a24b38',
  royalHover: '#731b04',
  gold: '#D8B76A',
  goldLight: '#F5EDD6',
  mauve: '#A8829C',
  champagne: '#FCFAF8',
};

// Predefined categories
const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'women', name: 'Women Healthcare' },
  { id: 'sports', name: 'Sports Nutrition' },
  { id: 'kids', name: 'Kids Nutrition' }
];

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { 
    products = [], 
    loading = false, 
    error = null, 
    filters = { category: [], subcategory: [], prescriptionRequired: null },
    allSubcategories = [], 
  } = useSelector((state) => state.products);

  const isMobile = useMediaQuery('(max-width:900px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (mobileOpen) {
      const firstFocusable = document.querySelector('.MuiDrawer-paper button, .MuiDrawer-paper input');
      firstFocusable?.focus();
    }
  }, [mobileOpen]);

 const activeFilterCount = [
    ...(filters.category || []),
    ...(filters.subcategory || []),
    filters.prescriptionRequired !== null ? 1 : 0,
    searchTerm ? 1 : 0,
    priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE ? 1 : 0
  ].filter(Boolean).length;

  useEffect(() => {
    const fetchData = setTimeout(() => {
      dispatch(fetchProductsByFilters({
        category: filters.category,
        subcategory: filters.subcategory,
        prescription: filters.prescriptionRequired,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        search: searchTerm,
        sortBy,
        limit: 12
      }));
    }, 300);
    return () => clearTimeout(fetchData);
  }, [dispatch, filters, searchTerm, priceRange, sortBy]);

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    dispatch(setFilters({ ...filters, category: newCategories }));
  };

  const handleSubcategoryChange = (subcategory) => {
    const newSubcategories = filters.subcategory.includes(subcategory)
      ? filters.subcategory.filter(s => s !== subcategory)
      : [...filters.subcategory, subcategory];
    dispatch(setFilters({ ...filters, subcategory: newSubcategories }));
  };

  const handlePrescriptionChange = (e) => {
    const value = e.target.value === 'null' ? null : e.target.value === 'true';
    dispatch(setFilters({ ...filters, prescriptionRequired: value }));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSearchTerm('');
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSortBy('newest');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: THEME.royal }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const filterDrawer = (
    <Box sx={{ p: 2, width: '100%', height: '100%', backgroundColor: THEME.champagne }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ color: THEME.royal, fontFamily: '"Cormorant Garamond", serif', fontWeight: 'bold' }}>
          Filters
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: THEME.gold } } }}
        slotProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: THEME.gold }} />
            </InputAdornment>
          )
        }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortBy}
          onChange={handleSortChange}
          label="Sort By"
          sx={{ '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: THEME.gold } }}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
          <MenuItem value="rating">Highest Rated</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <FormLabel sx={{ color: THEME.royal, mb: 1, fontWeight: 'bold' }}>Price Range</FormLabel>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={PRICE_STEP}
          sx={{ color: THEME.gold }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption">{formatINR(priceRange[0])}</Typography>
       <Typography variant="caption">{formatINR(priceRange[1])}</Typography>
        </Box>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <FormLabel sx={{ color: THEME.royal, fontWeight: 'bold' }}>Categories</FormLabel>
        <RadioGroup
          value={filters.category.length > 0 ? filters.category[0] : 'all'}
          onChange={(e) => {
            if (e.target.value === 'all') {
              dispatch(setFilters({ ...filters, category: [] }));
            } else {
              dispatch(setFilters({ ...filters, category: [e.target.value] }));
            }
          }}
        >
          {CATEGORIES.map((category) => (
            <FormControlLabel
              key={category.id}
              value={category.id}
              control={<Radio sx={{ color: THEME.mauve, '&.Mui-checked': { color: THEME.gold } }} />}
              label={category.name}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {allSubcategories?.length > 0 && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: THEME.royal, fontWeight: 'bold' }}>Subcategory</FormLabel>
          <FormGroup>
            {allSubcategories.map(subcategory => (
              <FormControlLabel
                key={subcategory}
                control={
                  <Checkbox
                    checked={filters.subcategory.includes(subcategory)}
                    onChange={() => handleSubcategoryChange(subcategory)}
                    sx={{ color: THEME.mauve, '&.Mui-checked': { color: THEME.gold } }}
                  />
                }
                label={subcategory}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}

      <FormControl fullWidth>
        <FormLabel sx={{ color: THEME.royal, fontWeight: 'bold' }}>Prescription</FormLabel>
        <RadioGroup
         value={filters?.prescriptionRequired === null ? 'null' : String(filters?.prescriptionRequired ?? '')}
         onChange={handlePrescriptionChange}
         >
          <FormControlLabel value="null" control={<Radio sx={{ color: THEME.mauve, '&.Mui-checked': { color: THEME.gold } }} />} label="All" />
          <FormControlLabel value="true" control={<Radio sx={{ color: THEME.mauve, '&.Mui-checked': { color: THEME.gold } }} />} label="Required" />
          <FormControlLabel value="false" control={<Radio sx={{ color: THEME.mauve, '&.Mui-checked': { color: THEME.gold } }} />} label="Not Required" />
        </RadioGroup>
      </FormControl>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<FilterAltOffIcon />}
        onClick={handleClearFilters}
        sx={{ 
          mt: 2,
          color: THEME.royal,
          borderColor: THEME.gold,
          borderRadius: '50px',
          '&:hover': {
            borderColor: THEME.royal,
            backgroundColor: THEME.goldLight
          }
        }}
      >
        Clear All Filters
      </Button>
    </Box>
  );

  return (
    <>
         <Helmet>
      <title>Buy Medicines & Healthcare Products Online | Maclienson Healthcare</title>
      <meta name="description" content="Browse genuine medicines, supplements, and healthcare products at Maclienson Healthcare." />
    </Helmet>
    
    <Container maxWidth="xl" sx={{ my: 4, backgroundColor: THEME.champagne, minHeight: '100vh', borderRadius: 4, py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 'bold', color: THEME.royal }}>
          Our Pharmaceutical Products
        </Typography>
        
        {isMobile && (
          <Badge badgeContent={activeFilterCount} color="primary" sx={{ 
            '& .MuiBadge-badge': { 
              backgroundColor: THEME.gold,
              color: THEME.royal
            }
          }}>
            <Button
              variant="outlined"
              startIcon={<MenuIcon />}
              onClick={handleDrawerToggle}
              sx={{
                color: THEME.royal,
                borderColor: THEME.gold,
                borderRadius: '50px',
                '&:hover': { backgroundColor: THEME.goldLight }
              }}
            >
              Filters
            </Button>
          </Badge>
        )}
      </Box>

      <Box sx={{ display: 'flex', width: '100%' }}>
        {!isMobile && (
          <Box sx={{ 
            width: 280, position: 'sticky', top: 100, height: 'calc(100vh - 100px)',
            overflowY: 'auto', alignSelf: 'flex-start', pr: 2, flexShrink: 0
          }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', border: `1px solid ${THEME.goldLight}` }}>
              {filterDrawer}
            </Paper>
          </Box>
        )}

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 } }}
        >
          {filterDrawer}
        </Drawer>

        <Box sx={{ flexGrow: 1, pl: !isMobile ? 2 : 0 }}>
          <Box sx={{ mb: 3 }}>
            {activeFilterCount > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ mb: 1, color: THEME.royal }}>Active Filters:</Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {filters.category.map(cat => (
                    <Chip key={cat} label={`Category: ${CATEGORIES.find(c => c.id === cat)?.name || cat}`} onDelete={() => handleCategoryChange(cat)}
                      sx={{ color: THEME.royal, borderColor: THEME.gold }} variant="outlined" size="small" />
                  ))}
                  {filters.subcategory.map(sub => (
                    <Chip key={sub} label={`Subcategory: ${sub}`} onDelete={() => handleSubcategoryChange(sub)}
                      sx={{ color: THEME.royal, borderColor: THEME.gold }} variant="outlined" size="small" />
                  ))}
                  {filters.prescriptionRequired !== null && (
                    <Chip label={`Prescription: ${filters.prescriptionRequired ? 'Required' : 'Not Required'}`} onDelete={() => dispatch(setFilters({ ...filters, prescriptionRequired: null }))}
                      sx={{ color: THEME.royal, borderColor: THEME.gold }} variant="outlined" size="small" />
                  )}
                  {(priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE) && (
                    <Chip label={`Price: ${formatINR(priceRange[0])} - ${formatINR(priceRange[1])}`} onDelete={() => setPriceRange([MIN_PRICE, MAX_PRICE])}
                      sx={{ color: THEME.royal, borderColor: THEME.gold }} variant="outlined" size="small" />
                  )}
                  {searchTerm && (
                    <Chip label={`Search: "${searchTerm}"`} onDelete={() => setSearchTerm('')}
                      sx={{ color: THEME.royal, borderColor: THEME.gold }} variant="outlined" size="small" />
                  )}
                </Stack>
                <Divider sx={{ my: 2 }} />
              </>
            )}

            <Typography variant="subtitle1" sx={{ mb: 2, color: THEME.royal, fontWeight: 500 }}>
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
            </Typography>
          </Box>

          {products.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3, backgroundColor: THEME.goldLight, color: THEME.royal }}>No products match your filters.</Alert>
          ) : (
            <Grid container spacing={3} sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}>
              {products.map(product => (
                <Grid key={product._id}>
                  <Card
                    sx={{
                      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                      borderRadius: 4, border: `1px solid ${THEME.goldLight}`, boxShadow: '0 10px 40px -10px rgb(96, 20, 20)',
                      transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px -10px rgb(96, 20, 20)' }
                    }}
                  >
                    <Box sx={{ position: 'relative', pt: '80%', backgroundColor: '#ffffff' }}>
                      <CardMedia
                        component="img"
                        image={product.images?.[0]?.url || '/default-medicine.jpg'}
                        alt={product.images?.[0]?.altText || product.name}
                        loading={isMobile ? 'lazy' : 'eager'} 
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', p: 2 }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, backgroundColor: THEME.champagne }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 'bold', color: THEME.royal }} noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '40px' 
                      }}>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: THEME.royal }}>
                          {formatINR(product.price)}
                        </Typography>
                        <Chip
                          label={product.prescriptionRequired ? 'Rx Required' : 'OTC'}
                          size="small"
                          sx={{ 
                            backgroundColor: product.prescriptionRequired ? THEME.mauve : THEME.goldLight,
                            color: product.prescriptionRequired ? '#fff' : THEME.royal,
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>
                      <Button
                        component={Link}
                        to={`/product/${product._id}`}
                        fullWidth
                        variant="contained"
                        sx={{ 
                          mt: 'auto',
                          borderRadius: '50px',
                          backgroundColor: THEME.royal,
                          padding: '10px 0',
                          '&:hover': { backgroundColor: THEME.royalHover }
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default ProductsPage;