class Coloring {
    String colors[];
    int colorCount;
    int numberOfVertices;

    public Coloring(String[] colors, int N) {
        this.colors = colors;
        this.numberOfVertices = N;
    }

    public boolean setColors(Vertex vertex){
        //Step: 1
        for(int colorIndex=0; colorIndex<colors.length; colorIndex++){
            if(!canColorWith(colorIndex, vertex))
                continue;

            vertex.color=colors[colorIndex];
            vertex.colored=true;
            colorCount++;

            if(colorCount== numberOfVertices)
                return true;

            for(Vertex nbrvertex: vertex.adjacentVertices){
                if (!nbrvertex.colored){
                    if(setColors(nbrvertex))
                        return true;
                }
            }

        }

        vertex.colored = false;
        vertex.color = "";
        return false;
    }

    boolean canColorWith(int colorIndex, Vertex vertex) {
        for(Vertex nbrvertex: vertex.adjacentVertices){
            if(nbrvertex.colored && nbrvertex.color.equals(colors[colorIndex]))
                return  false;
        }
        return true;
    }
}