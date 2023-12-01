
public class Main {
    public static void main(String[] args) {
        Vertex vertices[] = {new Vertex("A"), new Vertex("B"), new Vertex("C"), new Vertex("D")};

        vertices[0].addNeighbor(vertices[1]);
        vertices[1].addNeighbor(vertices[2]);
        vertices[2].addNeighbor(vertices[3]);
        vertices[0].addNeighbor(vertices[3]);

        String colors[] = {"Green", "Blue"};

        Coloring coloring = new Coloring(colors, vertices.length);

        boolean hasSolution = coloring.setColors(vertices[0]);

        if(!hasSolution){
            System.out.println("No Solution");
        }else{
            for(Vertex vertex : vertices){
                System.out.println(vertex.name + " " + vertex.color + "\n");
            }
        }
    }
}