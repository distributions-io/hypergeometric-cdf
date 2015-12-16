options( digits = 16 )
library( jsonlite )

m = 100
n = 100
k = 50
x = seq( 0, 50, 0.5 )
y = phyper( x, m, n, k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/deepset.json" )
