
import { useQuery,keepPreviousData } from "@tanstack/react-query"
import axios from "axios"
import { Container, Stack ,Flex, Heading, Text, Grid, Spinner,Button } from '@chakra-ui/react'
import { useNavigate, useParams, Link} from "react-router-dom"

const fetchData = async(id) =>{
    try {
        
        const  { data } = await axios.get(`https://gorest.co.in/public/v2/posts?page=${id}`);
        //console.log(data);
        return data;
    } catch (error) {

        throw Error('data not fetching');
        
    }
    
}
export const Home = () => {
    const { id } = useParams();
    const pageId = parseInt(id);
    const navigate = useNavigate();


    const { isPending, error, data  } = useQuery({queryKey: ['posts',pageId],queryFn:() =>fetchData(pageId), placeholderData: (previousData) => previousData })
    
    //if (isPending) return 'Loading...'

    //if (error) return 'An error has occurred: ' + error.message
    console.log(isPending,data);
  return (
    <Container maxW="1300px" mt="4">
        
        {isPending ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
        <Flex justify="space-between" mb="4">
            <Button colorScheme="red" onClick={ ()=>{
                if(pageId>1){
                    navigate(`/${pageId - 1}`);
                }
                
            }} disabled={pageId < 1}>Prev</Button>
            <Text>Current page : {pageId}</Text>
            <Button colorScheme="green" onClick={ ()=>{
                
               navigate(`/${pageId + 1}`);
            }}>Next</Button>
            </Flex>
        {data.map((post) =>(
            
            <Link to={`/post/${post.id}`} key={post.id}>
                <Stack p="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc">
                    <Flex justify="space-between">
                        <Text>
                            userId : {post.user_id}
                        </Text>
                        <Text>
                            PostId : {post.id}
                        </Text>
                    </Flex>
                    <Heading fontSize="2xl">Title</Heading>
                    <Text>{post.title}</Text>
                </Stack>
            </Link>
            
       
        ))}
        </>
        )}
  </Container>
  )
}
